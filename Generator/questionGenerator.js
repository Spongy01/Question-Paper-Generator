const QuestionManager = require("./questionManager");


/**
 * @description Given a set of questions, this returns a subset of questions such that the sum of their marks is equal to the specified requirement
 * @param {Array<Object>} questions Array containing question objects.
 * @param {number} len Length of questions array 
 * @param {number} marks Total marks requirement to select questions
 * @returns {Object} Returns an object containing information about whether such a combination can be made and the combination array
 */
function makeQuestions(questions,len,marks){
  //base case
  if (marks == 0){
      return {isPossible: true, subset : []}
  }
  if( len==0 && marks !=0){
      return { isPossible: false, subset: [] };
  }

  // if cant add last element, directy ignore it
  if (questions[len-1].marks > marks) {
      return makeQuestions(questions,len-1,marks);
  }

  let include = makeQuestions(questions, len - 1, marks - questions[len - 1].marks);
  if (include.isPossible) {
      return { isPossible: true, subset: include.subset.concat(questions[len - 1]) };
  } else {
      return makeQuestions(questions,len-1,marks);
  }
}


/**
 * @description Generates a question paper based on the specified requirements and criteria.
 * @param {Array<Object>} questionStore Array containing question objects.
 * @param {Object} requirements Object containing the marks and criteria for generating the question paper.
 * @returns Object indicating whether the generation is possible and the generated question paper.
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
module.exports.makeQuestions = makeQuestions