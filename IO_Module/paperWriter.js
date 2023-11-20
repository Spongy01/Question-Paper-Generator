/**
 * Module for managing and writing question papers to files.
 * @module PaperWriter
 */


const utils = require("../utils")
const fs = require('fs');
const path = require('path');

/**
 * Gets the next available file name in the directory to avoid overwriting existing files.
 *
 * @param {string} paperDir - The directory where question papers are stored.
 * @returns {string} - The next available file name for the question paper.
 */
function getNextFileName(paperDir) {
    let index = 1;
    let fileName;
    do {
      fileName = `questionPaper_${index}.json`;
      const filePath = path.join(paperDir, fileName);
      if (!fs.existsSync(filePath)) {
        return fileName;
      }
      index++;
    } while (true);
  }

/**
 * Writes the generated question paper to a JSON file in the directory specified in 'utils.js'
 * 
 * @param {Array<Object>} questionPaper The generated question paper to be written to the file.
 * @returns response code indicating the status of the file writing operation (SUCCESS or ERROR).
 */

function writePaperToFile(questionPaper){
    const directoryPath = utils.paperFolderDir


    // Check if the directory exists; if not, create it
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
        console.log('Directory "Question Papers" created');
      }
    
    const paperJSON = JSON.stringify(questionPaper, null, 2)
    const fileName = getNextFileName(directoryPath)
    const filePath = path.join(directoryPath, fileName)
    
    try {
        fs.writeFileSync(filePath, paperJSON, 'utf8');
        utils.hr()
        console.log('Paper has been successfully saved to', filePath);

        return utils.ResponseCodes.SUCCESS

    } catch (err) {
        utils.hr()
        console.error('Error writing file:', err);
        utils.ResponseCodes.ERROR
    }
}


module.exports.writePaperToFile = writePaperToFile