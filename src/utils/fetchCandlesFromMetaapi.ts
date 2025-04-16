/**
 * Fetches candle data using MetaAPI
 */
import MetaApi from "metaapi.cloud-sdk"
import { MetaApiInterval } from "../types"

// Get API key from environment variables
const META_API_ACCESS_TOKEN = process.env.META_API_ACCESS_TOKEN || ""
const META_API_ACCOUNT_ID = process.env.META_API_ACCOUNT_ID || ""

if (!META_API_ACCESS_TOKEN || !META_API_ACCOUNT_ID) {
  console.warn(
    "Warning: META_API_ACCESS_TOKEN or META_API_ACCOUNT_ID environment variables are not set. MetaAPI calls will fail.",
  )
}

// Create the MetaAPI instance
const api = new MetaApi(META_API_ACCESS_TOKEN)

// Define types for the response
interface MetaApiCandle {
  time: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
  spread?: number
  timeframe: string
}

// Define response interface
interface MetaApiHistoricalData {
  symbol: string
  values: Array<{
    x: number // Timestamp in milliseconds
    o: number // Open price
    h: number // High price
    l: number // Low price
    c: number // Close price
    v?: number // Volume (optional)
  }>
}

export async function fetchCandlesFromMetaapi({
  symbol,
  interval,
  startTime,
  endTime,
  limit,
}: {
  symbol: string
  interval: MetaApiInterval
  startTime?: string
  endTime?: string
  limit?: number
}): Promise<MetaApiHistoricalData> {
  try {
    if (!symbol) {
      throw new Error("Symbol is required")
    }

    // Convert start and end times to Date objects if provided
    const from = startTime
      ? new Date(startTime)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Default 7 days ago
    const to = endTime ? new Date(endTime) : new Date() // Default to now

    // Get the MetaTrader account
    const account =
      await api.metatraderAccountApi.getAccount(META_API_ACCOUNT_ID)

    // Wait for the connection
    const connection = account.getRPCConnection()
    await connection.connect()

    // Wait until synchronized
    await connection.waitSynchronized()

    const candles = await account.getHistoricalCandles(
      "EURUSD",
      interval,
      new Date(),
      limit,
    )

    // Convert interval to timeframe format expected by MetaAPI
    console.info(
      `Retrieved ${
        Array.isArray(candles) ? candles.length : 0
      } candles from MetaAPI`,
    )

    // Make sure candles is an array
    const candlesArray = Array.isArray(candles) ? candles : []

    // Transform the response to match the expected format
    const values = candlesArray.map((candle: MetaApiCandle) => ({
      x: candle.time.getTime(), // Convert to timestamp in milliseconds
      o: candle.open,
      h: candle.high,
      l: candle.low,
      c: candle.close,
      v: candle.volume,
    }))

    // Sort by timestamp
    values.sort((a: { x: number }, b: { x: number }) => a.x - b.x)

    // Limit the number of results if specified (if not already limited by the API call)
    const limitedValues =
      limit && limit > 0 && values.length > limit
        ? values.slice(-limit)
        : values

    return {
      symbol,
      values: limitedValues,
    }
  } catch (error) {
    console.error("Error fetching data from MetaAPI:", error)
    throw error
  }
}
