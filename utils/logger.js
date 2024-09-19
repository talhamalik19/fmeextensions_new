// utils/logger.js

let fs;
if (typeof window === 'undefined') {
  // We are on the server-side
  fs = require('fs');
}

const logErrorToFile = (error) => {
  try {
    const errorMessage = `[${new Date().toISOString()}] ${error}\n`;
    fs.appendFile('error.log', errorMessage, (err) => {
    });
  } catch (e) { }
};

module.exports = logErrorToFile;
