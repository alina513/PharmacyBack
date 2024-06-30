const {Product} = require("../models/product.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllProducts = async (req, res) => {
  // const {page = 1, limit = 20} = req.query;
  // const skip = (page - 1) * limit;
  const result = await Product.find();
  res.json(result);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};




module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getOneProduct: ctrlWrapper(getOneProduct)
};
