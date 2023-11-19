const utils = require("../utils")


/**
 * Validates the requirements object for generating question papers.
 * @param {Object} requirements - The object containing marks and criteria for generating the question paper.
 * @returns {number} Returns a response code indicating the validation status.
 */
function validateRequirements(requirements){
    
    if(requirements.marks == undefined){
        console.error("The requirements object does not contain 'marks'")
        return utils.ResponseCodes.ERROR
    }
    totalMarks = requirements.marks

    if(requirements.criteria == undefined || JSON.stringify(requirements.criteria) === '{}'){
        console.error("The requirements object does not contain any criteria to make paper on")
        return utils.ResponseCodes.ERROR
    }
    requirementCriterias = requirements.criteria

    criteriaFound = false

    for (criteria in requirementCriterias){
        if(criteria == 'difficulty'){
            criteriaFound = true
            sumValidation = difficultyValidationHelper(requirementCriterias[criteria])
            if( sumValidation == false){
                console.error("The fractions in Difficulty criteria don't add up to 100, which is NOT VALID.")
                return utils.ResponseCodes.ERROR
            }
            fractionValidation = fractionValidationHelper(requirementCriterias[criteria], totalMarks)
            if( fractionValidation == false){
                console.error("The fractions in Difficulty lead to marks in decimal points, which is NOT VALID.")
                return utils.ResponseCodes.ERROR
            }
        }
        // can add more validations here
        // ....

    }
    if( criteriaFound ){
        return utils.ResponseCodes.SUCCESS
    } else{
        console.error("The requirements object does not contain any valid criteria to make paper on")
        return utils.ResponseCodes.SUCCESS
    }
}

/**
 * Helper function to validate the difficulty criteria in the requirements.
 * @param {Object} difficulty the difficutly criteria object
 * @returns {boolean} Returns true if the difficulty criteria is validated; otherwise, false.
 */
function difficultyValidationHelper(difficulty){
    let sum =  0
    for (const fraction in difficulty){
      
        sum += difficulty[fraction]
    }
    if(sum == 100){
        return true
    }
    return false
}

/**
 * Helper function to validate the fractions of the criteria against total marks.
 * @param {Object} criteria - The criteria object.
 * @param {number} marks - The total marks available.
 * @returns {boolean} Returns true if the fractions are valid against total marks; otherwise, false.
 */
function fractionValidationHelper(criteria, marks){
    isValid = true
    for (const fraction in criteria){
       
        // this gives the fractional marks of a component in any criteria. Ex, 30% of 50 , fractionalMarks = 15        
        fractionalMarks = (criteria[fraction]*marks)/100
        if(! Number.isInteger(fractionalMarks)){ 
            // if any component requires marks in fraction like 3.33, then the given requirement is not valid.
            isValid = false
            return isValid
        }
    }
    return isValid
}



module.exports.validateRequirements = validateRequirements