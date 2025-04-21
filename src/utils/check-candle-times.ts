/**
 * Utility script to check candle closing times from MetaAPI
 *
 * Run with: npx ts-node src/utils/check-candle-times.ts
 */
import MetaApi from "metaapi.cloud-sdk"
import "dotenv/config"

// Get API key from environment variables
const META_API_ACCESS_TOKEN = process.env.META_API_ACCESS_TOKEN || ""
const META_API_ACCOUNT_ID = process.env.META_API_ACCOUNT_ID || ""

// Symbols and timeframes to check
const SYMBOLS = ["EURUSD"]
const TIMEFRAMES = ["1d"] // Add more timeframes if needed: "1h", "4h", etc.

if (!META_API_ACCESS_TOKEN || !META_API_ACCOUNT_ID) {
  console.error("MetaAPI credentials not found in environment variables")
  process.exit(1)
}

async function checkCandleTimes() {
  try {
    console.log("Starting candle time analysis...")
    const api = new MetaApi(META_API_ACCESS_TOKEN)

    // Get the MetaTrader account
    const account =
      await api.metatraderAccountApi.getAccount(META_API_ACCOUNT_ID)
    console.log("Connected to account:", META_API_ACCOUNT_ID)

    // Wait for the connection
    const connection = account.getRPCConnection()
    await connection.connect()
    console.log("Connection established")

    // Wait until synchronized
    await connection.waitSynchronized()
    console.log("Connection synchronized")

    // Get server time to compare with local time
    const localTime = new Date()
    console.log("Local time:", localTime.toISOString())

    // Analyze each symbol and timeframe
    for (const symbol of SYMBOLS) {
      for (const timeframe of TIMEFRAMES) {
        console.log(
          `\n======= Analyzing ${symbol} on ${timeframe} timeframe =======`,
        )

        // Get the last 20 candles
        const candles = await account.getHistoricalCandles(
          symbol,
          timeframe,
          new Date(),
          20,
        )

        if (!candles || !Array.isArray(candles) || candles.length === 0) {
          console.log(
            `No candles found for ${symbol} on ${timeframe} timeframe`,
          )
          continue
        }

        console.log(`Found ${candles.length} candles`)

        // Print detailed information about each candle
        candles.forEach((candle, index) => {
          const candleTime = candle.time

          console.log(`Candle ${index + 1}:`)
          console.log(`  ISO Time: ${candleTime.toISOString()}`)
          console.log(`  UTC Time: ${candleTime.toUTCString()}`)
          console.log(`  Local Time: ${candleTime.toString()}`)
          console.log(
            `  Time of day (UTC): ${candleTime.getUTCHours()}:${candleTime.getUTCMinutes()}`,
          )
          console.log(
            `  Date: ${candleTime.getUTCFullYear()}-${candleTime.getUTCMonth() + 1}-${candleTime.getUTCDate()}`,
          )
          console.log(
            `  OHLC: ${candle.open}, ${candle.high}, ${candle.low}, ${candle.close}`,
          )
          console.log(`  Timeframe: ${candle.timeframe}`)
          console.log("  ------")
        })

        // Analyze daily candle patterns
        if (timeframe === "1d") {
          console.log("\nAnalyzing daily candle patterns:")

          // Check if candles close at the same time
          const closingHours = candles.map((c) => c.time.getUTCHours())
          const closingMinutes = candles.map((c) => c.time.getUTCMinutes())

          const uniqueHours = [...new Set(closingHours)]
          const uniqueMinutes = [...new Set(closingMinutes)]

          console.log(
            `Daily candles close at UTC hour(s): ${uniqueHours.join(", ")}`,
          )
          console.log(
            `Daily candles close at UTC minute(s): ${uniqueMinutes.join(", ")}`,
          )

          if (uniqueHours.length === 1 && uniqueMinutes.length === 1) {
            console.log(
              `All daily candles consistently close at ${uniqueHours[0]}:${uniqueMinutes[0]} UTC`,
            )
          } else {
            console.log("Daily candles have inconsistent closing times!")
          }
        }
      }
    }

    console.log("\nAnalysis complete")
    process.exit(0)
  } catch (error) {
    console.error("Error during analysis:", error)
    process.exit(1)
  }
}

// Run the analysis
checkCandleTimes().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
