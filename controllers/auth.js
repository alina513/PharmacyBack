const {User} = require("../models/user");
const  HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const sendEmail = require("../helpers/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const {nanoid} = require("nanoid");

dotenv.config();
const {SECRET_KEY, BASE_URL} = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");



const register = async(req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});

if (user) {
    throw HttpError(409, "Email in use")
};
const hashpassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);
const verificationCode = nanoid();

const newUser = await User.create({...req.body, password:hashpassword, avatarURL, verificationToken: verificationCode});
const verifyEmail = {
    to: email,
    from: "alinaromanko513@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`
};
await sendEmail(verifyEmail);

res.status(201).json({
    user: {
    email: newUser.email,
    subscription: newUser.subscription}
})
}; 


const verifyEmail = async(req, res)=> {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        throw HttpError(404, "User not found")
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

    res.status(200).json({
        message: "Verification successful"
    })
}


const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email not found");
    }
    if(user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        from: "alinaromanko513@meta.ua",
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent"
    })
}



const login = async(req, res) => {
    const {password, email, subscription} = req.body;
    const user = await User.findOne({email});
    if (!user) {throw HttpError(401, "Email or password is wrong")
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    };
    if(!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({token,
        user: {
            email: user.email,
            subscription: user.subscription
          }});

};

const getCurrent = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "Logout success"
    })
}

const updateAvatar = async(req, res) => {
const {_id} = req.user;
if(!req.file) {
    throw HttpError(400, "No file uploaded");
}
const {path: tempUpload, originalname} = req.file;
const image = await Jimp.read(tempUpload);
const resizedImage = await image.resize(250, 250);
await resizedImage.writeAsync(tempUpload);
const fileName = `${_id}_${originalname}`;
const resultUpload = path.join(avatarsDir, fileName);
await fs.rename(tempUpload, resultUpload);
const avatarURL = path.join("avatars", fileName);
await User.findByIdAndUpdate(_id, {avatarURL});
res.json({
    avatarURL,})
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}