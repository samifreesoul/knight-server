/**
 * Fetches candle data using Finnhub API
 */
// @ts-ignore
const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
// Get API key from environment variables
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "";
api_key.apiKey = FINNHUB_API_KEY;

if (!FINNHUB_API_KEY) {
  console.warn(
    "Warning: FINNHUB_API_KEY environment variable is not set. Finnhub API calls will fail."
  );
}

// Set up Finnhub client
const finnhubClient = new finnhub.DefaultApi();

// Define types for Finnhub response
interface FinnhubCandleResponse {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v?: number[]; // Volumes (optional)
}

/**
 * Convert date string to Unix timestamp in seconds
 */
const dateToTimestamp = (dateStr: string): number => {
  return Math.floor(new Date(dateStr).getTime() / 1000);
};

export async function fetchCandlesFromFinnhub({
  symbol,
  interval,
  startTime,
  endTime,
  limit,
}: {
  symbol: string;
  interval: string;
  startTime?: string;
  endTime?: string;
  limit?: number;
}) {
  try {
    if (!symbol) {
      throw new Error("Symbol is required");
    }

    // Convert date strings to timestamps if provided
    const from = startTime
      ? dateToTimestamp(startTime)
      : Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60; // Default 7 days ago
    const to = endTime
      ? dateToTimestamp(endTime)
      : Math.floor(Date.now() / 1000); // Default to now

    console.info("Fetching from Finnhub for:", {
      symbol,
      interval,
      from: new Date(from * 1000).toISOString(),
      to: new Date(to * 1000).toISOString(),
    });

    finnhubClient.quote("AAPL", (error: any, data: any, response: any) => {
      if (error) {
        console.error("Errorl:", error);
      } else {
        console.log("qoute data:", data);
      }
    });

    finnhubClient.stockCandles(
      "AAPL",
      "D",
      1590988249,
      1591852249,
      (error: any, data: FinnhubCandleResponse, response: any) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("stockCandles data:", data);
        }
      }
    );
  } catch (error) {
    console.error("Error fetching data from Finnhub:", error);
    throw error;
  }
}
