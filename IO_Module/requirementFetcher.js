/**
 * Functions related to fetching requirements for generating question papers.
 * @module RequirementFetcher
 */

const fs = require("node:fs")
const path = require("node:path")
const utils = require("../utils")
const inquirer =  require('inquirer')


/**
 * Array containing questions to determine data input method.
 * @type {Array<Object>}
 */
const dataInputQuestions = [

    {
      type: 'list',
      name: 'dataInputFormat',
      message: 'From where should we take criteria for generation?:',
      choices: ['Predefined JSON file [ at: ' + utils.requirementsFile +" ]" , "Interactive CLI"]
    }
  ];

/**
 * Prompts for CLI-based input of total marks and criteria for generating the question paper based on difficulty.
 * @type {Array<Object>}
 */  
const CLIBasePrompts = [
    {
      type: 'number',
      name: 'marks',
      message: 'Enter the total marks:',
      validate: value => {
        return value > 0 ? true : 'Please enter a valid positive number.';
      }
    },
  
    {
      type: 'list',
      name: 'criteriaForPaper',
      message: 'What is your criteria for generation?:(Select from choices below)',
      choices: ["Difficulty"] // add more criteria here to augment ways to generate questions papers || Ex: Topic, Subject etc.
    }
  
  ];

/**
 * Prompts for CLI-based input of percentage distribution for difficulty levels.
 * @type {Array<Object>}
 */
const CLIDifficultyPrompts = [
    {      
        type: 'number',
        name: 'easy',
        message: 'Enter the percentage of Easy Difficulty questions:',
        validate: value => {
            return value >= 0 && value <=100 ? true : 'Please enter a valid positive number.';
        }   
    },   
    {      
        type: 'number',
        name: 'medium',
        message: 'Enter the percentage of Medium Difficulty questions:',
        validate: value => {
            return value >= 0 && value <=100 ? true : 'Please enter a valid positive number.';
        }   
    },   
    {      
        type: 'number',
        name: 'hard',
        message: 'Enter the percentage of Hard Difficulty questions:',
        validate: value => {
            return value >= 0 && value <=100 ? true : 'Please enter a valid positive number.';
        }   
    },      
  ];

/**
 * Confirmation prompt for file-based input.
 * @type {Array<Object>}
 */
const FileBasePrompt = [
    {
        type: 'confirm',
        name: 'confirmation',
        message: 'Do you want to proceed with reading the file? :',
      },
]
  // add other prompts here for other constraints like topic and subject etc
                                
//----------------------------------------------------------------------------------------

/**
 * Fetches requirements from a predefined JSON file defined in 'utils.js' .
 * @returns {number} code - containing response code 
 * @returns {Array<Object>} requirements - requirements object to generate paper on
 */
async function fetchFromFile(){
    requirementsPath = path.join(utils.baseDir, utils.requirementsFile)
    console.log()
    console.log("The default file location from which data will be fetched : baseDir/",utils.requirementsFile )
    console.log("You can change the file location from the 'utils.js'")


    confirmation = await inquirer.prompt(FileBasePrompt)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log()
            console.error('Error:', error);
            return "error"
          });
    

    if(confirmation.confirmation == false || confirmation.confirmation == "error" ){
        // terminate
        console.log()
        console.log("You can change the default file in utils.js ...")
        console.log("Terminating this instance ...");
        console.log()
        return {code: utils.ResponseCodes.TERMINATE, requirements : {}}
    }

    try{

        reqFileRaw = fs.readFileSync(requirementsPath, "utf-8")
        reqFileUsable = JSON.parse(reqFileRaw)
        console.log()
        utils.hr("Requirements File Read Successfully")
        return {code: utils.ResponseCodes.SUCCESS, requirements : reqFileUsable}

    }catch(fileError){
        console.log()
        console.error("Caught Error while Reading Requirements File : ", fileError)
        return {code: utils.ResponseCodes.ERROR, requirements : {}}

    }
}


/**
 * Fetches requirements via CLI-based interactive prompts.
 * @returns {number} code - containing response code 
 * @returns {Array<Object>} requirements - requirements object to generate paper on
 */
async function fetchFromCLI(){

    requirements = {}
  
    responseCode = await inquirer.prompt(CLIBasePrompts)
      .then(async answers => {
   
        requirements.marks = answers.marks
  
        condition = answers.criteriaForPaper
  
        if(condition == "Difficulty"){
          
          code = await inquirer.prompt(CLIDifficultyPrompts)
            .then(difficultyAnswers => {
              criteria  = {}
              difficulty = {}
  
              difficulty.Easy =  difficultyAnswers.easy
              difficulty.Medium =  difficultyAnswers.medium
              difficulty.Hard =  difficultyAnswers.hard

              criteria = {difficulty: difficulty}
              requirements.criteria = criteria
              return utils.ResponseCodes.SUCCESS
  
            })
            .catch(error => {
              console.error('Error:', error);
              return utils.ResponseCodes.ERROR
            });
  
          return code
  
        }
  
        // add more conditions below
  
        //       
  
      })
      .catch(error => {
        console.error('Error:', error);
        return utils.ResponseCodes.ERROR
      });
   
  
    return {code: responseCode, requirements : requirements}
  
  }


/**
 * Fetches requirements based on user-selected input method.
 * @returns {number} code - containing response code 
 * @returns {Array<Object>} requirements - requirements object to generate paper on
 */
async function fetchRequirements(){

    response = await inquirer.prompt(dataInputQuestions)
        .then(async answers => {
            inputFrom = answers.dataInputFormat
            console.log("Fetching input from ", inputFrom)

            if(inputFrom=='Interactive CLI'){
            
                response = await fetchFromCLI();
                return response

            }
            else if (inputFrom == 'Predefined JSON file [ at: ' + utils.requirementsFile +" ]" ){
                response = await fetchFromFile();
                return response
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return {code: utils.ResponseCodes.ERROR, requirements : {}}
            
          });

    return response

}


module.exports.fetchRequirements = fetchRequirements

