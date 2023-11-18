
/**
 * Manages operations related to questions.
 */
class QuestionManager {
     
    /**
     * Constructs a QuestionManager instance.
     * @param {Array<Object>} questionStore - Array containing question objects.
     */
    constructor(questionStore) {
        this.questionStore = questionStore
    }

    /**
     * Updates the question store with a new set of questions.
     * @param {Array<Object>} newQuestionStore - New set of questions.
     */
    updateQuestionStore(newQuestionStore){
        this.questionStore = newQuestionStore
    }
    
    /**
     * Shuffles an array of questions. Uses Fisher-Yates shuffle algorithm
     * @param {Array<Object>} questions - Array of questions to be shuffled.
     * @returns {Array<Object>} - Shuffled array of questions.
     */
    shuffle(questions) {
        let currentIndex = questions.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [questions[currentIndex], questions[randomIndex]] = [
            questions[randomIndex], questions[currentIndex]];
        }
        return questions;
    }

    /**
     * Retrieves questions by difficulty level.
     * @param {string} difficulty - Difficulty level ('Easy', 'Medium', 'Hard').
     * @returns {Array<Object>} - Array of questions filtered by the specified difficulty.
     */
    getQuestionsByDifficulty(difficulty) {
        let questionsOnDifficulty = this.questionStore.filter((question) => question.difficulty === difficulty)
        questionsOnDifficulty = this.shuffle(questionsOnDifficulty)
        return questionsOnDifficulty
    }
    
    // Additional functionality can be added
   
    getQuestionsByTopic(topic){
        // logic here to keep only questions based on topic
        return []
    }

    getQuestionsByDifficultyAndTopic(topic, difficulty){
        //logic here to keep questions of a particular difficulty and a topic
        return []
    }

    getQuestionsByMarksLessThan(marks){
        //logic here to keep questions which are less than 'marks' marks.
        return []
    }
    // and many more

}


module.exports = QuestionManager