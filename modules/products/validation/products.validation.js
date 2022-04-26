const joi = require('joi');

module.exports = {
    addProductValidation: {
        body: joi.object().required().keys({
            productName: joi.string().required().messages({
                "string.empty": "You have to enter product name",
                "any.required": "You have to enter product name",
            }),
            productImageURL: joi.object().required().messages({
                "object.empty": "You have to enter product image",
                "any.required": "You have to enter product image"
            }),
            price: joi.number().required().messages({
                "any.required": "You have to enter product price",
                "number.base": "please enter a valid price"
            }),
            rate: joi.number().min(0).max(5).optional().default(0).messages({
                "number.base": "please enter a valid rate number",
                "number.max": "rate value must be between 0 and 5",
                "number.min": "rate value must be between 0 and 5"
            }),
            inStock: joi.boolean().optional().default(true).messages({
                "boolean.base": "please enter a valid answer"
            }),
            topProduct: joi.boolean().optional().default(false).messages({
                "boolean.base": "please enter a valid answer"
            }),
            storeId: joi.string().required().messages({
                "string.empty": "You have to enter product store",
                "any.required": "You have to enter product store"
            }),
            categoryId: joi.string().required().messages({
                "string.empty": "You have to enter product category",
                "any.required": "You have to enter product category"
            })
        })
    },
    updateProductValidation: {
        body: joi.object().required().keys({
            productName: joi.string().optional().messages({
                "string.empty": "You have to enter product name"
            }),
            productImageURL: joi.object().required().messages({
                "object.empty": "You have to enter product image",
                "any.required": "You have to enter product image"
            }),
            price: joi.number().optional().messages({
                "number.base": "please enter a valid price"
            }),
            rate: joi.number().min(0).max(5).optional().default(0).messages({
                "number.base": "please enter a valid rate number",
                "number.max": "rate value must be between 0 and 5",
                "number.min": "rate value must be between 0 and 5"
            }),
            inStock: joi.boolean().optional().default(true).messages({
                "boolean.base": "please enter a valid answer"
            }),
            topProduct: joi.boolean().optional().default(false).messages({
                "boolean.base": "please enter a valid answer"
            }),
            storeId: joi.string().optional().messages({
                "string.empty": "You have to enter product store",
                "any.required": "You have to enter product store"
            }),
            categoryId: joi.string().optional().messages({
                "string.empty": "You have to enter product category",
                "any.required": "You have to enter product category"
            })
        })
    }
}