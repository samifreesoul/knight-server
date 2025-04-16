/**
 * Request Handlers
 *
 * This file centralizes the export of all request handlers.
 * Import handlers from this file instead of directly from their respective files.
 */

export { handleHistoricalData } from "./historicalDataHandler";
export { handleFinnhubHistoricalData } from "./finnhubHistoricalDataHandler";
export { handleMetaApiHistoricalData } from "./metaapi-historical-data";

// Add more handler exports here as they are created
// Example: export { handleSomeOtherEndpoint } from './someOtherHandler';
