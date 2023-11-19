const {generateQuestionPaper, makeQuestions} = require("../Generator/questionGenerator");
const QuestionManager = require("../Generator/questionManager");




describe("tests to check working of makeQuestions", () => {
    let questionManager;
    const sampleQuestions = [
        {
        "question": "What is the capital of France?",
        "subject": "Geography",
        "topic": "World Capitals",
        "difficulty": "Easy",
        "marks": 2
        },
        {
        "question": "Who wrote the play 'Hamlet'?",
        "subject": "Literature",
        "topic": "Drama",
        "difficulty": "Medium",
        "marks": 2
        },
        {
        "question": "What is the formula for calculating the area of a circle?",
        "subject": "Mathematics",
        "topic": "Geometry",
        "difficulty": "Hard",
        "marks": 3
        },
        {
        "question": "What is the process of photosynthesis?",
        "subject": "Biology",
        "topic": "Cellular Processes",
        "difficulty": "Medium",
        "marks": 1
        },
        {
        "question": "Who painted the Mona Lisa?",
        "subject": "Art History",
        "topic": "Renaissance Art",
        "difficulty": "Easy",
        "marks": 1
        },
    ];

    beforeEach(()=>{
        
        questionManager = new QuestionManager(sampleQuestions);
    })

    test("test to check if function can return questions equal to required marks",()=>{
        
        
        const easyQuestions = questionManager.getQuestionsByDifficulty('Easy');
        console.log("Easy Questinos: ", easyQuestions)

        const response = makeQuestions(easyQuestions, easyQuestions.length, 3);
        expect(response).toHaveProperty('isPossible', true);
        expect(response).toHaveProperty('subset');
        
        // the generated questions should have the required number of marks
        const totalMarks = response.subset.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.marks;
        }, 0);
        expect(totalMarks).toBe(3);
    })

    test("test to check if proper response recorded when it can't generate questions", ()=>{
        const easyQuestions = questionManager.getQuestionsByDifficulty('Easy');
        const response = makeQuestions(easyQuestions, easyQuestions.length, 4);
        expect(response).toHaveProperty('isPossible', false);
        expect(response).toHaveProperty('subset', []);
    })
})


describe("tests to check working of generateQuestionPaper", () => {
    let  QuestionManager;
    const sampleQuestions = [
        {
        "question": "What is the capital of France?",
        "subject": "Geography",
        "topic": "World Capitals",
        "difficulty": "Easy",
        "marks": 2
        },
        {
        "question": "Who wrote the play 'Hamlet'?",
        "subject": "Literature",
        "topic": "Drama",
        "difficulty": "Medium",
        "marks": 2
        },
        {
        "question": "What is the formula for calculating the area of a circle?",
        "subject": "Mathematics",
        "topic": "Geometry",
        "difficulty": "Hard",
        "marks": 3
        },
        {
        "question": "What is the process of photosynthesis?",
        "subject": "Biology",
        "topic": "Cellular Processes",
        "difficulty": "Medium",
        "marks": 1
        },
        {
        "question": "Who painted the Mona Lisa?",
        "subject": "Art History",
        "topic": "Renaissance Art",
        "difficulty": "Easy",
        "marks": 2
        },
    ];





    test("Generates a question paper based on specified requirements", ()=>{
        const requirements = {
            marks: 10,
            criteria: {
                difficulty: {
                    Easy: 40,
                    Medium: 30,
                    Hard: 30,
                },
                
            },
        };

        const response = generateQuestionPaper(sampleQuestions, requirements);
        
        expect(response).toHaveProperty('isPossible', true);
        expect(response).toHaveProperty('questionPaper');
        
    })

    test("provides proper response when it cannot generate question paper based on specified requirements", ()=>{
        // for the sample data, we cannot generate a question paper with below requirements
        const requirements = {
            marks: 10,
            criteria: {
                difficulty: {
                    Easy: 30,
                    Medium: 40,
                    Hard: 30,
                },
                
            },
        };

        const response = generateQuestionPaper(sampleQuestions, requirements);
        
        // should return isPossible false
        expect(response).toHaveProperty('isPossible', false);
        expect(response).toHaveProperty('questionPaper', null);
        
    })


    test("question paper generates paper with marks stated in requirements", ()=>{
        const requirements = {
            marks: 10,
            criteria: {
                difficulty: {
                    Easy: 40,
                    Medium: 30,
                    Hard: 30,
                },
                
            },
        };

        const response = generateQuestionPaper(sampleQuestions, requirements);

        expect(response).toHaveProperty('isPossible', true);

        // sum up the total marks in generated question paper and compare with the marks in requiremetns.
        const totalMarks = response.questionPaper.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.marks;
        }, 0);
        expect(totalMarks).toBe(requirements.marks);

    })

})

