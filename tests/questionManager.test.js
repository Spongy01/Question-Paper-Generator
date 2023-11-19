const QuestionManager = require('../Generator/questionManager');

describe('tests related to QuestionManager class', () => {
    let questionManager;
    const sampleQuestions = [
            {
            "question": "What is the capital of France?",
            "subject": "Geography",
            "topic": "World Capitals",
            "difficulty": "Easy",
            "marks": 5
            },
            {
            "question": "Who wrote the play 'Hamlet'?",
            "subject": "Literature",
            "topic": "Drama",
            "difficulty": "Medium",
            "marks": 10
            },
            {
            "question": "What is the formula for calculating the area of a circle?",
            "subject": "Mathematics",
            "topic": "Geometry",
            "difficulty": "Hard",
            "marks": 8
            },
            {
            "question": "What is the process of photosynthesis?",
            "subject": "Biology",
            "topic": "Cellular Processes",
            "difficulty": "Medium",
            "marks": 7
            },
            {
            "question": "Who painted the Mona Lisa?",
            "subject": "Art History",
            "topic": "Renaissance Art",
            "difficulty": "Easy",
            "marks": 5
            },
    ];
  
    beforeEach(() => {
      questionManager = new QuestionManager(sampleQuestions);
    });
  
    test('correctly initializes the question store', () => {
      expect(questionManager.questionStore).toEqual(sampleQuestions);
    });
  
    test('shuffles the array of questions', () => {
      const originalArray = [...sampleQuestions];
      const shuffledQuestions = questionManager.shuffle(sampleQuestions);
      expect(shuffledQuestions).not.toEqual(originalArray); // Assuming shuffle modifies the array
      // You might need to further validate the shuffling logic here
    });
  
    test('retrieves questions by specific difficulty', () => {
      const easyQuestions = questionManager.getQuestionsByDifficulty('Easy');
      expect(easyQuestions.every((q) => q.difficulty === 'Easy')).toBe(true);
      // Add more assertions based on your logic and requirements
    });

    test('updates the question store', () => {
        const newQuestions = sampleQuestions.slice(3); 
        questionManager.updateQuestionStore(newQuestions);
        expect(questionManager.questionStore).toEqual(newQuestions);
    })
  
  });