export type MetaApiInterval =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "4h"
  | "1d"
  | "1w"
  | "1M"

// Define the expected types for parameters
export type MetaApiHistoricalDataParams = {
  symbol: string
}

export type MetaApiHistoricalDataQuery = {
  interval: MetaApiInterval
  startTime?: string
  endTime?: string
  limit?: string
}

// Finnhub
declare module "finnhub" {
  export class ApiClient {
    static instance: {
      authentications: {
        api_key: {
          apiKey: string
          apiKeyPrefix?: string
        }
      }
    }
  }

  export class DefaultApi {
    constructor()
    setApiKey(auth: any, key: string): void
    stockCandles(
      symbol: string,
      resolution: string,
      from: number,
      to: number,
      callback: (error: any, data: any, response: any) => void,
    ): void
  }
}
