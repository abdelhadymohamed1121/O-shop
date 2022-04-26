const User = require("../model/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 5;
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/users");

const signUp = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "This email already have an account" })
        } else {
            let newUser = new User({ firstName, lastName, email, password });
            await newUser.save();
            res.status(200).send({ message: "Success" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const userSignIn = async(req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Please enter a valid email" })
        } else {
            let match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
                res.status(200).json({ message: "Success", token });
            } else {
                res.status(422).json({ message: "This password is invalid" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const editUserProfile = async(req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = req.user._id;
    const emailTaken = await User.findOne({ email });
    const user = await User.findById({ _id: id }).catch(error => { return });
    if (emailTaken) {
        res.status(500).json({ message: "This email already taken" });
    } else {
        if (req.files) {
            if (user.profilePictureURL == null) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + req.files.profilePictureURL.name), req.files.profilePictureURL.data);
                await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, profilePictureURL: path.join('uploads/users', uniqueSuffix + '-' + req.files.profilePictureURL.name) })
                    .then(re => res.status(200).send({ message: "Success" }))
                    .catch(error => res.status(500).json({ message: "Something went wrong" }));
            }
            if (user.profilePictureURL != null) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + req.files.profilePictureURL.name), req.files.profilePictureURL.data);
                fs.unlinkSync(user.profilePictureURL);
                await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, profilePictureURL: path.join('uploads/users', uniqueSuffix + '-' + req.files.profilePictureURL.name) })
                    .then(re => res.status(200).send({ message: "Success" }))
                    .catch(error => res.status(500).json({ message: "Something went wrong" }));
            }
        } else {
            await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, profilePictureURL: user.profilePictureURL })
                .then(re => res.status(200).send({ message: "Success" }))
                .catch(error => res.status(500).json({ message: "Something went wrong" }));
        }
    }
}

const resetPassword = async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.user._id
    const user = await User.findById({ _id: id }).catch(error => { return });
    let match = await bcrypt.compare(oldPassword, user.password);
    if (match) {
        let hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch(error => res.status(500).json({ message: "Something went wrong" }));
    } else {
        res.status(400).json({ message: "Please enter a correct password" });
    }
}

const addAddress = async(req, res) => {
    const { address } = req.body;
    const id = req.user._id;
    await User.findByIdAndUpdate({ _id: id }, { address })
        .then(re => res.status(200).send({ message: "Success" }))
        .catch(error => res.status(500).json({ message: "Something went wrong" }));
}

const removeAddress = async(req, res) => {
    const id = req.user._id;
    await User.findByIdAndUpdate({ _id: id }, { address: null })
        .then(re => res.status(200).send({ message: "Success" }))
        .catch(error => res.status(500).json({ message: "Something went wrong" }));
}

const getAllUsers = async(req, res) => {
    let { page, size } = req.query;
    if (!page) {
        page = 1
    }
    if (!size) {
        size = 25
    }
    const limit = parseInt(size);
    const skip = (page - 1) * limit;
    try {
        const allUsers = await User.find({}).select("-password").limit(limit).skip(skip);
        const totalRes = await User.count();
        const totalPages = Math.ceil(totalRes / limit);
        res.status(200).send({ message: "Success", totalRes, totalPages, allUsers });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getCurrentUser = async(req, res) => {
    const userId = req.user._id;
    await User.findOne({ _id: userId }).select("-password").select("-role")
        .then(userData => res.status(200).send({ message: "Success", userData }))
        .catch(error => res.status(500).json({ message: "Something went wrong" }))
}

module.exports = {
    signUp,
    userSignIn,
    editUserProfile,
    resetPassword,
    addAddress,
    removeAddress,
    getAllUsers,
    getCurrentUser
}