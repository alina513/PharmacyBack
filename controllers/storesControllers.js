const {Store} = require("../models/store.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllStores = async (req, res) => {
  // const {page = 1, limit = 20} = req.query;
  // const skip = (page - 1) * limit;
  const result = await Store.find();
  res.json(result);
};






module.exports = {
  getAllStores: ctrlWrapper(getAllStores)
};
