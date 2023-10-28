// Import necessary modules from their respective packages.
import express from "express";       // Express web server framework
import cors from "cors";             // Middleware to enable Cross-Origin Resource Sharing
import morgan from "morgan";        // HTTP request logger middleware

// Import custom utility middlewares and route handler modules
import * as middleware from "./utils/middleware.js"; // Custom middlewares for handling unknown endpoints and errors
import helloRoute from "./routes/helloRouter.js";    // Router for the /hello endpoint

// Initialize an Express application instance
const app = express();

// Middleware to parse incoming requests with JSON payloads into JavaScript objects.
// This makes it easier to work with request data in our route handlers.
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS).
// This allows client-side applications from different origins to make requests to our server.
app.use(cors());

// Middleware to log incoming HTTP requests.
// Here, the "tiny" format string is passed to morgan, which means it will log minimal request information.
app.use(morgan("tiny"));

// Define a healthcheck endpoint at the root ("/") of the application.
// This is useful for checking if the server is up and running, especially in production or deployment scenarios.
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

// Use the imported "helloRoute" router for handling all routes that start with "/hello".
app.use("/hello", helloRoute);

// Middleware to catch requests to non-existent routes (i.e., unknown endpoints).
// If a request doesn't match any of our defined routes, this middleware will be invoked.
app.use(middleware.unknownEndpoint);

// Middleware to handle errors that occur during request processing.
// This provides a consistent way to return error responses to the client.
app.use(middleware.errorHandler);

// Export the configured Express app instance so it can be used in other modules (like the server setup in index.js).
export default app;
