import { Request, Response } from "express"
import { fetchCandlesFromMetaapi } from "../utils/fetchCandlesFromMetaapi"
import {
  MetaApiHistoricalDataParams,
  MetaApiHistoricalDataQuery,
  MetaApiInterval,
} from "../types"

export const handleMetaApiHistoricalData = async (
  req: Request,
  res: Response,
) => {
  try {
    const { symbol } = req.params as MetaApiHistoricalDataParams
    const { interval, startTime, limit } =
      req.query as MetaApiHistoricalDataQuery

    if (!symbol) {
      return res.status(400).json({ error: "'symbol' parameter is required" })
    }

    if (!interval) {
      return res.status(400).json({ error: "'interval' parameter is required" })
    }

    console.log(
      `Received request for ${symbol} with interval ${interval}, startTime: ${startTime}`,
    )

    const candlesData = await fetchCandlesFromMetaapi({
      symbol,
      interval,
      startTime,
      limit: limit ? parseInt(limit) : undefined,
    })

    // Include important debugging info in the response
    console.log(
      `Responding with ${candlesData.values.length} candles for ${symbol}`,
    )

    return res.json({
      ...candlesData,
      requestParams: {
        symbol,
        interval,
        startTime,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching MetaAPI historical data:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
