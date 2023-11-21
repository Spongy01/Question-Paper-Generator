/**
 * Driver Module representing the Question Paper Generation Process.
 * @module QuestionPaperGenerator
 */

const utils = require("./utils")

utils.hr()
utils.hr("QUESTION PAPER GENERATOR")


const { fetchRequirements } = require("./IO_Module/requirementFetcher");
const { validateRequirements } = require("./Validator/validator");
const { generateQuestionPaper } = require("./Generator/questionGenerator");
const reader = require("./IO_Module/fileReader");
const { writePaperToFile } = require("./IO_Module/paperWriter");


/**
 * @description Runs the question paper generation process based on provided requirements and data.
 * Fetches requirements, validates them, reads data, generates the question paper, 
 * and writes it to a file if successful.
 * @async
 */
async function driver(){
    
    // Fetch requirements from the user
    let response = await fetchRequirements()    
    
    // Check if requirements fetch was successful
    if(response.code != utils.ResponseCodes.SUCCESS){
        utils.hr()
        console.log()
        console.error("Shutting Down Program");
        utils.hr()

        return 
    }

    console.log()
    console.log("Requirements :")
    console.log(response.requirements);
    console.log()

    let requirements = response.requirements

    utils.hr("Validating the Requirements");
    console.log('....')

    // Validate the fetched requirements
    response =  validateRequirements(requirements)
    
    // Check if requirements validation was successful
    if(response != utils.ResponseCodes.SUCCESS){
        console.log()
        console.error("Shutting Down Program");
        utils.hr()
        return 
    }
    utils.hr("Requirements Validated")
    console.log()

    // Read questions required for question paper generation
    response = reader()
    code = response.code 
    data = response.data

    // Check if data reading was successful
    if(code == utils.DataReadCodes.NO_DATA_READ){
        utils.hr()
        console.log("WARN:")
        utils.hr()
        console.error("No Data Could be Read");
        console.log()
        console.error("Shutting Down Program");
        utils.hr()
        return
    }

    if(code == utils.DataReadCodes.PARTIAL_DATA_READ){
        // if multiple files are present and not all were read, display partial message
        console.warn("WARN: only Partial Data was read.")
    }

    console.log("No of Questions Read : ", data.length)

    // Check if paper generation was possible 
    response = generateQuestionPaper(data, requirements)

    if( response.isPossible == false ){
        utils.hr()
        console.log("WARN:")
        utils.hr()
        console.log("Paper could Not be Generated with this criteria")
        console.log()
        console.error("Shutting Down Program");
        utils.hr()
        return
    }
    
    utils.hr("Paper Generation Successful")
    console.log();

    // Write the generated question paper to a file
    response = writePaperToFile(response.questionPaper)

    // Check if writing the paper to file was successful
    if(response == utils.ResponseCodes.ERROR){
        console.log()
        console.log("WARN: ")
        console.log("Paper could not be written to a File")
        

    }

    console.log()
    console.error("Shutting Down Program");
    utils.hr()

}


driver();