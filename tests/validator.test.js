const {validateRequirements} = require("../Validator/validator")
const utils = require("../utils")

describe('tests related to input requirements validation', () =>{


    test("correctly validates input requirements ", ()=>{
        requirements = {
            marks : 10,
            criteria : {
              difficulty : { 
                Easy: 40,
                Medium: 30,
                Hard: 30,
              }
              // can add more criteria here 
            }
        }

        let val = validateRequirements(requirements)
        expect(val).toBe(utils.ResponseCodes.SUCCESS)
    })

    test("returns error code on faulty input requirements: total fractions dont sum up to 100  ", ()=>{
        requirements = {
            marks : 10,
            criteria : {
              difficulty : { 
                Easy: 30,
                Medium: 30,
                Hard: 30, // total adds up to only 90%
              }
              // can add more criteria here 
            }
        }

        let val = validateRequirements(requirements)
        expect(val).toBe(utils.ResponseCodes.ERROR)
    })

    test("returns error code on faulty input requirements: fractions give marks in decimals  ", ()=>{
        requirements = {
            marks : 9,
            criteria : {
              difficulty : { 
                Easy: 40,  // marks for easy diff = 3.6
                Medium: 30, // marks for med diff = 2.7
                Hard: 30,  // marks for hard diff = 2.7
              }
              // can add more criteria here 
            }
        }

        let val = validateRequirements(requirements)
        expect(val).toBe(utils.ResponseCodes.ERROR)
    })
})