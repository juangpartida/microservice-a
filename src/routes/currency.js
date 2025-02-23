// Import required modules
const express = require("express");  // Import the Express framework for creating the API
const router = express.Router();  // Use Express Router to handle routes separately
const cors = require("cors");  // Import CORS to allow cross-origin requests

// Enable CORS so that the microservice can be accessed from different origins (e.g., a different port)
router.use(cors());

/**
 * Function to generate randomized coin loot based on player level, party size, and reduce flag.
 * 
 * @param {number} level - The level of the player (1 to 20)
 * @param {number} members - The size of the party (1 to 6)
 * @param {boolean} reduce - Flag to auto-convert lower denominations (true or false)
 * @returns {object} - Object containing generated gold (gp), silver (sp), and copper (cp) coins
 */
function generateCurrency(level, members, reduce) {
    // Calculate gold range based on the level (scaled linearly from level * 1 to level * 10)
    const minGold = level * 1;
    const maxGold = level * 10;

    // Randomly generate gold within the defined range
    const baseGold = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold;

    // Generate silver and copper based on a percentage of the generated gold
    const baseSilver = Math.floor(Math.random() * (baseGold * 0.5)) + 1;  // Up to 50% of gold
    const baseCopper = Math.floor(Math.random() * (baseGold * 0.2)) + 1;  // Up to 20% of gold

    // Scale the generated currency by the number of party members
    let gp = baseGold * members;
    let sp = baseSilver * members;
    let cp = baseCopper * members;

    // Automatically reduce smaller denominations into larger ones if 'reduce' is true
    if (reduce) {
        sp += Math.floor(cp / 10);  // Convert 10 copper → 1 silver
        cp %= 10;  // Keep the remaining copper coins

        gp += Math.floor(sp / 10);  // Convert 10 silver → 1 gold
        sp %= 10;  // Keep the remaining silver coins
    }

    // Return the final coin counts
    return { gp, sp, cp };
}

// Define the API endpoint for currency generation
router.get("/", (req, res) => {
    // Extract and convert query parameters from the request URL
    const level = parseInt(req.query.level);  // Player's level
    const members = parseInt(req.query.members);  // Number of party members
    const reduce = req.query.reduce === "true";  // Convert string to boolean (true or false)

    // Log the incoming request to the terminal for debugging
    console.log(`Received currency request → Level: ${level}, Members: ${members}, Reduce: ${reduce}`);

    // Input validation:
    // Ensure the level is a valid integer between 1 and 20
    if (isNaN(level) || level < 1 || level > 20) {
        return res.status(400).json({ error: "Level must be between 1 and 20." });
    }

    // Ensure the party size is a valid integer between 1 and 6
    if (isNaN(members) || members < 1 || members > 6) {
        return res.status(400).json({ error: "Party members must be between 1 and 6." });
    }

    // Call the generateCurrency function using validated inputs
    const currency = generateCurrency(level, members, reduce);

    // Log the generated currency for debugging
    console.log(`Generated currency: ${JSON.stringify(currency)}`);

    // Send the response in JSON format
    res.json({ coins: currency });
});

// Export the router so it can be used in other parts of the application (like the main server.js file)
module.exports = router;




// // Import Express for handling routes
// const express = require("express");

// // Import custom logger for logging info and errors
// const { logInfo, logError } = require("../utils/logger");

// // Create an Express router
// const router = express.Router();

// /**
//  * Function to generate randomized coin loot
//  * @param {number} level - Player level (1-20)
//  * @param {number} members - Party size (1-6)
//  * @param {boolean} reduce - Whether to consolidate coins
//  * @returns {object} - Randomly generated gold, silver, and copper pieces
//  */
// function generateCurrency(level, members, reduce) {
//     // Generate base random values for gold, silver, and copper
//     const baseGold = Math.floor(Math.random() * (level * 10)) + 1;
//     const baseSilver = Math.floor(Math.random() * (level * 5)) + 1;
//     const baseCopper = Math.floor(Math.random() * (level * 2)) + 1;

//     // Scale values based on the number of party members
//     let gp = baseGold * members;
//     let sp = baseSilver * members;
//     let cp = baseCopper * members;

//     // If reduce=true, convert 10 copper → 1 silver and 10 silver → 1 gold
//     if (reduce) {
//         sp += Math.floor(cp / 10);  // Convert excess copper to silver
//         cp %= 10;  // Keep remaining copper

//         gp += Math.floor(sp / 10);  // Convert excess silver to gold
//         sp %= 10;  // Keep remaining silver
//     }

//     // Return the generated currency in JSON format
//     return { gp, sp, cp };
// }

// // Define API endpoint for currency generation
// router.get("/", (req, res) => {
//     // Parse query parameters from the request
//     const level = parseInt(req.query.level);
//     const members = parseInt(req.query.members);
//     const reduce = req.query.reduce === "true"; // Convert string to boolean

//     // Log incoming request details
//     logInfo(`Request received: level=${level}, members=${members}, reduce=${reduce}`);

//     // Validate level input (must be between 1 and 20)
//     if (isNaN(level) || level < 1 || level > 20) {
//         logError(`Invalid level: ${level}`);
//         return res.status(400).json({ error: "Level must be between 1 and 20." });
//     }

//     // Validate party size input (must be between 1 and 6)
//     if (isNaN(members) || members < 1 || members > 6) {
//         logError(`Invalid members: ${members}`);
//         return res.status(400).json({ error: "Party members must be between 1 and 6." });
//     }

//     // Generate currency based on validated input parameters
//     const currency = generateCurrency(level, members, reduce);

//     // Log successful response with generated loot
//     logInfo(`Generated loot: ${JSON.stringify(currency)}`);

//     // Send JSON response to the client
//     res.json({ coins: currency });
// });

// // Export the router for use in the main server file
// module.exports = router;
