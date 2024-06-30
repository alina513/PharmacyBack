const {Cart} = require("../models/cart");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllCarts = async (req, res) => {
  const {_id: owner} = req.user;
  // const {page = 1, limit = 20} = req.query;
  // const skip = (page - 1) * limit;
  const result = await Cart.find({owner});
  res.json(result);
};



const createCart = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  if (!result) {
    throw HttpError(400);
  }
  res.status(201).json(result);
};

const updateCart = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const {_id} = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate({
  _id: id,
   owner: _id}, 
   req.body,
    {new: true});
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};



module.exports = {
  getAllCarts: ctrlWrapper(getAllCarts),
  createCart: ctrlWrapper(createCart),
  updateCart: ctrlWrapper(updateCart)
};
