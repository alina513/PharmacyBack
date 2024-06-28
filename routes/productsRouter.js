const express = require("express");

const ctrl = require("../controllers/productsControllers");
const isValidId = require("../helpers/isValidId.js");
const authenticate = require("../middlewares/authenticate.js")


const productsRouter = express.Router();

productsRouter.get("/", authenticate, ctrl.getAllProducts);

productsRouter.get("/:id", authenticate, isValidId, ctrl.getOneProduct);



module.exports = productsRouter;
