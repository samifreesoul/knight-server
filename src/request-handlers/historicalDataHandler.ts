import { Request, Response } from "express"
import { fetchCandles } from "../utils/fetchCandles"

export const handleHistoricalData = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params
    const { interval, startDate, endDate, limit } = req.query

    if (!symbol) {
      return res.status(400).json({ error: "Symbol parameter is required" })
    }

    if (!interval) {
      return res.status(400).json({ error: "Interval parameter is required" })
    }

    // Format symbol to uppercase and remove any non-alphabetic characters

    console.info("Fetching candles for:", {
      symbol,
      interval,
      startDate,
      endDate,
      limit,
    })

    const data = await fetchCandles({
      symbol: symbol as string,
      interval: interval as string,
      startDate: startDate as string | undefined,
      endDate: endDate as string | undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    })

    return res.json(data)
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
