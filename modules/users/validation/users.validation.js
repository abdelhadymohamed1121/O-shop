const joi = require('joi');

module.exports = {
    signUpValidation: {
        body: joi.object().required().keys({
            firstName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).required().messages({
                "string.empty": "You have to enter first name",
                "string.pattern.base": "Please enter a valid first name",
                "any.required": "You have to enter first name"
            }),
            lastName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).required().messages({
                "string.empty": "You have to enter last name",
                "string.pattern.base": "Please enter a valid last name",
                "any.required": "You have to enter last name"
            }),
            email: joi.string().empty('').email({ minDomainSegments: 2 }).empty('').required().messages({
                "string.email": "Please enter a valid email",
                "string.empty": "You have to enter email",
                "any.required": "You have to enter email"
            }),
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
                "string.empty": "You have to enter password",
                "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
                "any.required": "You have to enter password"
            }),
            profilePictureURL: joi.string().uri().optional().messages({
                "string.empty": "You have to enter product image",
                "string.uri": "You should enter a valid image URI"
            }),
            address: joi.string().empty('').optional().messages({
                "string.empty": "Please enter a valid address"
            })
        })
    },
    editUserProfileValidation: {
        body: joi.object().required().keys({
            firstName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).optional().messages({
                "string.empty": "You have to enter first name",
                "string.pattern.base": "Please enter a valid first name"
            }),
            lastName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).optional().messages({
                "string.empty": "You have to enter last name",
                "string.pattern.base": "Please enter a valid last name"
            }),
            email: joi.string().empty('').email({ minDomainSegments: 2 }).empty('').optional().messages({
                "string.email": "Please enter a valid email",
                "string.empty": "You have to enter email"
            }),
            profilePictureURL: joi.string().uri().optional().messages({
                "string.empty": "You have to enter product image",
                "string.uri": "You should enter a valid image URI"
            }),
            address: joi.string().empty('').optional().messages({
                "string.empty": "Please enter a valid address"
            })
        })
    },
    userSignInValidation: {
        body: joi.object().required().keys({
            email: joi.string().empty('').email({ minDomainSegments: 2 }).empty('').required().messages({
                "string.email": "Please enter a valid email",
                "string.empty": "You have to enter at email",
                "any.required": "You have to enter at email"
            }),
            password: joi.string().empty('').required().messages({
                "string.empty": "You have to enter password",
                "any.required": "You have to enter password"
            })
        })
    },
    resetPasswordValidation: {
        body: joi.object().required().keys({
            oldPassword: joi.string().empty('').required().messages({
                "string.empty": "You have to enter password",
                "any.required": "You have to enter password"
            }),
            newPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
                "string.empty": "You have to enter password",
                "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
                "any.required": "You have to enter password"
            })
        })
    },
    addAddressValidation:{
        body: joi.object().required().keys({
            address: joi.string().empty('').required().messages({
                "string.empty": "Please enter a valid address",
                "any.required": "You have to enter an address"
            })
        })
    }
}