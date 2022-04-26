const app = require("express").Router();
const { signUp, userSignIn, editUserProfile, resetPassword, addAddress, removeAddress, getAllUsers, getCurrentUser } = require('../controller/users.controller');
const validator = require('../../../validation/common.validation');
const { userSignInValidation, editUserProfileValidation, signUpValidation, resetPasswordValidation, addAddressValidation } = require("../validation/users.validation");
const isAuthorized = require("../../../config/isAuthorized");
const { Edit_User_PROFILE, RESET_PASSWORD, ADD_ADDRESS, REMOVE_ADDRESS, GET_ALL_USERS, GET_CURRENT_USER } = require("../../../endPoints/endPoints");

app.post("/signUp", [validator(signUpValidation)], signUp);
app.post("/userSignIn", [validator(userSignInValidation)], userSignIn);
app.put("/editUserProfile", [isAuthorized(Edit_User_PROFILE), validator(editUserProfileValidation)], editUserProfile);
app.put("/resetPassword", [isAuthorized(RESET_PASSWORD), validator(resetPasswordValidation)], resetPassword);
app.put("/addAddress", [isAuthorized(ADD_ADDRESS), validator(addAddressValidation)], addAddress);
app.put("/removeAddress", [isAuthorized(REMOVE_ADDRESS)], removeAddress);
app.get("/getAllUsers", [isAuthorized(GET_ALL_USERS)], getAllUsers);
app.get("/getCurrentUser", [isAuthorized(GET_CURRENT_USER)], getCurrentUser);

module.exports = app;