/**
 * Fetches quote data using Twelve Data API
 */

const TWELVE_DATA_API_KEY = "b6080bb2210a44a4ae9062741f61d433"
const TWELVE_DATA_BASE_URL = "https://api.twelvedata.com"

interface TwelveDataQuote {
  symbol: string
  name: string
  exchange: string
  datetime: string
  open: string
  high: string
  low: string
  close: string
  volume: string
  previous_close: string
  change: string
  percent_change: string
  average_volume: string
  is_market_open: boolean
  fifty_two_week: {
    low: string
    high: string
    low_change: string
    high_change: string
    low_change_percent: string
    high_change_percent: string
    range: string
  }
}

interface TwelveDataResponse {
  status?: string
  message?: string
  symbol?: string
  exchange?: string
  datetime?: string
  open?: string
  high?: string
  low?: string
  close?: string
  volume?: string
  previous_close?: string
  change?: string
  percent_change?: string
  average_volume?: string
  is_market_open?: boolean
  fifty_two_week?: {
    low: string
    high: string
    low_change: string
    high_change: string
    low_change_percent: string
    high_change_percent: string
    range: string
  }
}

type GenerateUrlParams = {
  symbol?: string
  interval?: string
  startDate?: string
  endDate?: string
  limit?: number
}

const generateUrl = ({
  symbol = "BABA",
  interval = "15min",
  startDate = "2024-03-01",
  endDate = "2024-03-05",
  limit = 10,
}: GenerateUrlParams) => {
  // Format symbol for Twelve Data API (e.g., "BABA" for Alibaba)

  //api.twelvedata.com/time_series?symbol=BABA&interval=15min&start_date=2024-03-01&end_date=2024-03-05&apikey=b6080bb2210a44a4ae9062741f61d433

  const params = new URLSearchParams({
    symbol,
    interval,
    start_date: startDate,
    end_date: endDate,
    apikey: TWELVE_DATA_API_KEY,
  })

  return `${TWELVE_DATA_BASE_URL}/time_series?${params.toString()}`
}

export async function fetchCandles({
  symbol,
  interval,
  startDate,
  endDate,
  limit,
}: {
  symbol: string
  interval: string
  startDate?: string
  endDate?: string
  limit?: number
}) {
  try {
    if (!symbol) {
      throw new Error("Symbol is required")
    }

    const url = generateUrl({
      symbol,
      interval,
      startDate,
      endDate,
      limit,
    })

    console.info("Fetching from Twelve Data URL:", url)

    const response = await fetch(url)
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response body:", errorText)
      throw new Error(
        `Failed to fetch quote data: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const data = (await response.json()) as any

    // Check if the API returned an error
    if (data.status === "error") {
      throw new Error(`Twelve Data API error: ${data.message}`)
    }

    return {
      ...data,
      values: data.values.map((val: any) => ({
        x: new Date(val.datetime).getTime(),
        o: parseFloat(val.open),
        c: parseFloat(val.close),
        h: parseFloat(val.high),
        l: parseFloat(val.low),
        // v: parseFloat(val.volume),
      })),
    }
  } catch (error) {
    console.error("Error fetching data from Twelve Data:", error)
    throw error
  }
}
