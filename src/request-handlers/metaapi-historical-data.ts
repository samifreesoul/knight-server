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
    const { interval, startTime, endTime, limit } =
      req.query as MetaApiHistoricalDataQuery

    if (!symbol) {
      return res.status(400).json({ error: "'symbol' parameter is required" })
    }

    if (!interval) {
      return res.status(400).json({ error: "'interval' parameter is required" })
    }

    const data = await fetchCandlesFromMetaapi({
      symbol,
      interval,
      startTime,
      endTime,
      limit: limit ? parseInt(limit) : undefined,
    })

    return res.json(data)
  } catch (error) {
    console.error("Error fetching MetaAPI historical data:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
