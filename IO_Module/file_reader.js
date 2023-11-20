/**
 * Module to read question data from files specified in 'data_locator.js'.
 * @module FileReader
 */


const fs = require("node:fs")
const path = require("node:path")
const utils = require("../utils")

utils.hr()
console.log()
utils.hr("INFO");
console.log("Current Dir for File Reader Module: ",__dirname)
console.log("Utils : ", utils)
utils.hr()


/**
 * @description This function reads the question data from the files specified in 'data_locator.js'
 * @returns {number} code - Return code representing the data reading status.
 * @returns {Array} data - Array containing the fetched question data.
 */

function read_questions(){

    // Get the locations of data_locations.json file <It holds the file names where data is available for fetching>
    dataLocationsPath = path.join(utils.baseDir, utils.dataLocator)
    totalQuestionData = []

    // default condition : All Data read successfully.
    responseCode = utils.DataReadCodes.FULL_DATA_READ

    try{
    
        dataFilesRaw = fs.readFileSync(dataLocationsPath, "utf-8")
        dataFilesUsable = JSON.parse(dataFilesRaw)
        locations = dataFilesUsable["locations"]
        
        noOfFiles = locations.length
        dataDir = utils.dataDir
        console.log("Data Locator found ", noOfFiles, " files containing question data")

        locations.forEach((element,index) => {
            console.log("Reading File ", index+1, "/",noOfFiles, " | File : ", element)
        
            try{
                filePath = path.join(dataDir, element) 
                questionDataRaw = fs.readFileSync(filePath,"utf-8")
                questionDataParsed = JSON.parse(questionDataRaw)

                // merge all questions into a single array.
                totalQuestionData = [...totalQuestionData, ...questionDataParsed]
        
            }catch(fileError){
                console.error("Caught Error while Reading Data File : ", fileError);

                // If any error during file reading of a particular file, convert responseCode to partial read condition. 
                responseCode = utils.DataReadCodes.PARTIAL_DATA_READ
            }
        });

    }catch (error){
        // Will reach here if there is some error in reading the contents of data_locations.json file
        console.error("Caught Error while Reading Data Locator File : ", error);
        // return with response code : No data read, and an empty array of questions
        return {code: utils.DataReadCodes.NO_DATA_READ, data : totalQuestionData}
    }

    if(JSON.stringify(totalQuestionData) === '[]'){
        return {code: utils.DataReadCodes.NO_DATA_READ, data : totalQuestionData}
    }   

    return {code: responseCode, data : totalQuestionData}

}


module.exports = read_questions