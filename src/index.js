// Import necessary modules from their respective packages.
import http from "http";             // Native Node module to create HTTP server
import { config } from "dotenv";     // Module to load environment variables from .env file
import app from "./app.js";          // Import the Express app configuration
import * as logger from "./utils/logger.js";  // Logger utility for consistent logging

// Check if the application is running in a non-production environment
if (process.env.NODE_ENV !== "production") {
  // If it's a development or other non-production environment, load environment variables from .env file
  config();
}

// Create an HTTP server instance using the imported Express app.
// The server will handle incoming requests and forward them to the Express app.
const server = http.createServer(app);

// Set the server port. Prioritize the PORT value from environment variables (useful for deployment platforms like Railway),
// otherwise fall back to 3003 as the default port.
const PORT = process.env.PORT || 3003;

// Start the server to listen on the specified port.
// Once the server starts successfully, it logs the listening port using the logger utility.
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
