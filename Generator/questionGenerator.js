/**
 * @description Functions related to question paper generation and management.
 * @module QuestionGenerator
 */

const QuestionManager = require("./questionManager");


/**
 * @description Given a set of questions, this returns a subset of questions such that the sum of their marks is equal to the specified requirement
 * @param {Array<Object>} questions Array containing question objects.
 * @param {number} len Length of questions array 
 * @param {number} marks Total marks requirement to select questions
 * @returns {boolean} isPossible - is questions generation on following conditions possible 
 * @returns {Array<Object>}  - array of questions if isPossible is true, else empty array []
 */
function makeQuestions(questions,len,marks){
  // Initialize dp array with null 
  const dp = new Array(len + 1).fill(null).map(() => new Array(marks + 1).fill(null));

  // Base case initialization
  for (let i = 0; i <= len; i++) {
    dp[i][0] = [];
  }

  // filling the dp array
  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= marks; j++) {
      if (j < questions[i - 1].marks) {
        dp[i][j] = dp[i - 1][j];
      } else {
        if (dp[i - 1][j] !== null) {
          dp[i][j] = dp[i - 1][j];
        } else if (dp[i - 1][j - questions[i - 1].marks] !== null) {
          dp[i][j] = [...dp[i - 1][j - questions[i - 1].marks], i - 1];
        }
      }
    }
  }
  isPossible = dp[len][marks] == null ? false : true
  subsetQuestions = []
  if(isPossible){
    indices = dp[len][marks]
    subsetQuestions = indices.map(index => questions[index])
  }
  // console.log(dp)
  return {isPossible:isPossible , subset:subsetQuestions}
}


/**
 * @description Generates a question paper based on the specified requirements and criteria.
 * @param {Array<Object>} questionStore Array containing question objects.
 * @param {Object} requirements Object containing the marks and criteria for generating the question paper.
 * @returns {boolean} isPossible - is questions generation on following conditions possible 
 * @returns {Array<Object>}  - array of questions if isPossible is true, else empty array []
 */
function generateQuestionPaper(questionStore, requirements){

  // create questionManager instance to extract questions based on conditions
  const questionManager = new QuestionManager(questionStore)
  
  const totalMarks = requirements.marks
  let criterias = requirements.criteria

  
  let isPossible = true // default setting describing generation of paper is possible
  let questionPaper = [] // array to hold final question paper
  
  for (const type in criterias){
    console.log("Making Paper on :", type)
    
    // for the difficulty criteria 
    if(type == "difficulty"){

      for (const diff in criterias[type]){
        
        const fraction = criterias[type][diff] // part of total marks for a particular difficulty in %
        const marksForFraction = totalMarks * (fraction/100) // absolute marks for a particular difficulty
        let fractionQuestions =  questionManager.getQuestionsByDifficulty(diff) // extract questions 
    
        let fractionPaper = makeQuestions(fractionQuestions, fractionQuestions.length, marksForFraction)
        
        if (fractionPaper.isPossible == false) {
          isPossible = false
          questionPaper = null
          break
          
        }

        fractionQuestions = fractionPaper.subset
        questionPaper = [...questionPaper, ...fractionQuestions]

      }

    }
    // can add other conditions here
    // .....

    return {isPossible: isPossible, questionPaper: questionPaper}
  }
}


module.exports.generateQuestionPaper = generateQuestionPaper
module.exports.makeQuestions = makeQuestions // only for testing purposes, not used in driver