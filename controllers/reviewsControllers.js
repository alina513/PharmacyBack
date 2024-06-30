const {Review} = require("../models/reviews.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllReviews = async (req, res) => {
  // const {page = 1, limit = 20} = req.query;
  // const skip = (page - 1) * limit;
  const result = await Review.find();
  res.json(result);
};






module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews)
};