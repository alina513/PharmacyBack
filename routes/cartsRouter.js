const express = require("express");

const ctrl = require("../controllers/cartControllers.js");
const  validateBody  = require("../helpers/validateBody.js");
const {schemas} = require("../models/cart.js");
const isValidId = require("../helpers/isValidId.js");
const authenticate = require("../middlewares/authenticate.js")


const cartsRouter = express.Router();

cartsRouter.get("/", authenticate, ctrl.getAllCarts);

cartsRouter.post(
  "/checkout", authenticate,
  validateBody(schemas.createCartSchema),
  ctrl.createCart
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateCartSchema),
  ctrl.updateCart
);


module.exports = cartsRouter;
