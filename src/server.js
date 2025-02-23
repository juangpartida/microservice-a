// Import required dependencies
const express = require("express");
const cors = require("cors");  // Import CORS
const { PORT } = require("./config");  // Load PORT from config file
const currencyRoutes = require("./routes/currency");  // Import currency router

const app = express();  // Initialize Express app
app.use(cors());  // Enable CORS

// Use the router correctly
app.use("/generate_currency", currencyRoutes);

// Start the server on the specified PORT
app.listen(PORT, () => {
    console.log(`Currency Generator Microservice running on port ${PORT}`);
});
