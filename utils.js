/**
 * Module representing utility functions and constants used in the question paper generation process.
 * @module Utils
 */

const path = require("node:path")

// Change here if any changes to file systems.

/**
 * Base directory where the script is located.
 * @constant {string}
 */
const baseDir = __dirname

/**
 * The name of the folder where data is stored directly with baseDir.
 * If you want the data to be read from multiple files, add them here.
 * Change this if the data folder's name is different.
 * @constant {string}
 */
const dataFolder = "data"

/**
 * The filename used to locate data locations.
 * Update this if you want to add more files to read data from
 * Note: the files mentioned here should be present in the folder 'dataFolder' to be accessible
 * @constant {string}
 */
const dataLocator = "data_locations.json"

/**
 * The filename used to locate the file containg paper generation requirements.
 * Update this if your requirements file is different
 * Note: This path is relative from 'baseDir'
 * @constant {string}
 */
const requirementsFile = "questionRequirements.json"

/**
 * The absolute path to the data directory.
 * @constant {string}
 */
const dataDir = path.join(baseDir, dataFolder)


/**
 * The name of the folder where papers are stored.
 * Relative path from 'baseDir'
 * @constant {string}
 */
const paperFolder = "Question Papers"

/**
 * The absolute path to the directory where generated question papers will be written.
 * @constant {string}
 */
const paperFolderDir = path.join(baseDir, paperFolder)

/**
 * Constants holding codes for data reading.
 * @readonly
 * @type {Object}
 * @property {number} NO_DATA_READ - Indicates no data was read.
 * @property {number} PARTIAL_DATA_READ - Indicates partial data was read.
 * @property {number} FULL_DATA_READ - Indicates full data was read.
 */
const DataReadCodes = {
    NO_DATA_READ: 0,
    PARTIAL_DATA_READ: 1,
    FULL_DATA_READ: 2,
};

/**
 * Constants holding codes for data reading.
 * @readonly
 * @type {Object}
 * @property {number} SUCCESS - Indicates a successful operation.
 * @property {number} ERROR - Indicates an error during the operation.
 * @property {number} TERMINATE - Indicates termination or cancellation of the operation.
 */
const ResponseCodes = {
    SUCCESS : 0,
    ERROR : 1,
    TERMINATE : 2
}


/**
 * @description Adds a horizontal line with optional text in the center.
 * @param {string} text - Optional text to display at the center of the horizontal line.
 */
function hr(text) {
    if (!text) {
      console.log('----------------------------------------------');
    } else {
      const paddedText = `    ${text}    `;
      const remainingLength = 46 - paddedText.length;
      const numOfDashes = Math.floor(remainingLength / 2);
      const dashes = '-'.repeat(numOfDashes);
      const separator = `${dashes}${paddedText}${dashes}`;
      console.log(separator);
    }
  }


module.exports.baseDir = baseDir
module.exports.dataDir = dataDir
module.exports.paperFolderDir = paperFolderDir
module.exports.dataLocator = dataLocator
module.exports.requirementsFile = requirementsFile

module.exports.DataReadCodes = DataReadCodes
module.exports.ResponseCodes = ResponseCodes 
module.exports.hr = hr

