const { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORY, ADD_ADVERTISMENT, UPDATE_ADVERTISMENT, DELETE_ADVERTISMENT, 
    GET_ALL_ADVERTISMENTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCT, GET_PRODUCT_BY_ID, RECENT_CATEGORIES, GET_CATEGORY_BY_ID,
    ADD_STORE, UPDATE_STORE, DELETE_STORE, GET_ALL_STORE, GET_ALL_USERS, GET_CURRENT_ADMIN, RECENT_STORES, COUNT_USERS_CATEGORIES_STORES,
    GET_STORE_BY_ID, GET_ADVERTISMENTS_BY_ID
} = require("../../endPoints/endPoints");

module.exports = [ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORY, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCT,
    ADD_STORE, UPDATE_STORE, DELETE_STORE, GET_ALL_STORE, GET_ALL_USERS, GET_CURRENT_ADMIN, RECENT_CATEGORIES, RECENT_STORES, 
    COUNT_USERS_CATEGORIES_STORES, GET_CATEGORY_BY_ID, GET_STORE_BY_ID, GET_PRODUCT_BY_ID, , ADD_ADVERTISMENT, UPDATE_ADVERTISMENT,
    DELETE_ADVERTISMENT, GET_ALL_ADVERTISMENTS, GET_ADVERTISMENTS_BY_ID
]