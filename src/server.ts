// TODO: remove this
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import express from "express"
import cors from "cors"
import "dotenv/config"
// import { testMetaApiSynchronization } from "./utils/testMetaApiSynchronization";

import {
  handleHistoricalData,
  handleFinnhubHistoricalData,
  handleMetaApiHistoricalData,
} from "./request-handlers"

// Validate required environment variables
const requiredEnvVars = [
  "META_API_ACCESS_TOKEN",
  "META_API_ACCOUNT_ID",
  "FINNHUB_API_KEY",
]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  )
  process.exit(1) // Exit with error code
}

// Only log if any variables are missing (we shouldn't reach here due to process.exit above)
// No logging of actual env variable values or their presence
if (missingEnvVars.length > 0) {
  console.error(
    `Some required environment variables are not present: ${missingEnvVars.join(
      ", ",
    )}`,
  )
}

const app = express()

// Enable CORS for all origins
app.use(cors())

const port = process.env.PORT || 3000

// Register routes
// app.get("/historical-data/symbols/:symbol/candles", handleHistoricalData);
app.get(
  "/finnhub-historical-data/symbols/:symbol/candles",
  handleFinnhubHistoricalData,
)

app.get(
  "/metaapi-historical-data/symbols/:symbol/candles",
  handleMetaApiHistoricalData,
)

app.get("/", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})

export { app }
