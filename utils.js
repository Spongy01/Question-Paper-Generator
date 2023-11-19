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
 * Constants holding codes for data reading.
 * @readonly
 * @enum {number}
 */
const DataReadCodes = {
    /** No data read. */
    NO_DATA_READ: 0,
    /** Partial data read. */
    PARTIAL_DATA_READ: 1,
    /** Full data read. */
    FULL_DATA_READ: 2,
};

const ResponseCodes = {
    SUCCESS : 0,
    ERROR : 1,
    TERMINATE : 2
}


module.exports.baseDir = baseDir
module.exports.dataDir = dataDir
module.exports.dataLocator = dataLocator
module.exports.requirementsFile = requirementsFile

module.exports.DataReadCodes = DataReadCodes
module.exports.ResponseCodes = ResponseCodes 

