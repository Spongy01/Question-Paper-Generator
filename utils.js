const path = require("node:path")

// Change here if any changes to file systems.

/**
 * Base directory where the script is located.
 * @constant {string}
 */
const baseDir = __dirname

/**
 * The name of the folder where data is stored directly with baseDir.
 * Change this if the data folder's name is different.
 * @constant {string}
 */
const dataFolder = "data"

/**
 * The filename used to locate data locations.
 * Update this if you want to add more files to read data from
 * Note: these files should be present in the folder 'dataFolder' to be accessible
 * @constant {string}
 */
const dataLocator = "data_locations.json"

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


module.exports.baseDir = baseDir
module.exports.dataDir = dataDir
module.exports.dataLocator = dataLocator

module.exports.DataReadCodes = DataReadCodes

