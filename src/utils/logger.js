const fs = require("fs");
const path = require("path");

// Log file location
const logFilePath = path.join(__dirname, "../../logs.txt");

/**
 * Logs messages to console and a log file
 * @param {string} type - Log type (INFO, ERROR)
 * @param {string} message - Log message
 */
function log(type, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type}] ${message}\n`;

    // Print to console
    console.log(logMessage);

    // Append log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error("Failed to write log:", err);
    });
}

module.exports = {
    logInfo: (message) => log("INFO", message),
    logError: (message) => log("ERROR", message)
};
