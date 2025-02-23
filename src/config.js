// Load environment variables (if available)
require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000  // Default to port 3000 if not specified
};
