import { Request, Response } from "express"
import { fetchCandlesFromFinnhub } from "../utils/fetchCandlesFromFinnhub"

export const handleFinnhubHistoricalData = async (
  req: Request,
  res: Response,
) => {
  try {
    const { symbol } = req.params
    const { interval, startTime, endTime, limit } = req.query

    if (!symbol) {
      return res.status(400).json({ error: "'symbol' parameter is required" })
    }

    if (!interval) {
      return res.status(400).json({ error: "'interval' parameter is required" })
    }

    const data = await fetchCandlesFromFinnhub({
      symbol: symbol as string,
      interval: interval as string,
      startTime: startTime as string | undefined,
      endTime: endTime as string | undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    })

    return res.json(data)
  } catch (error) {
    console.error("Error fetching Finnhub historical data:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
