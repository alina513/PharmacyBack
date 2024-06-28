const express = require("express");

const ctrl = require("../controllers/productsControllers");
const isValidId = require("../helpers/isValidId.js");


const productsRouter = express.Router();

productsRouter.get("/", ctrl.getAllProducts);

productsRouter.get("/:id", isValidId, ctrl.getOneProduct);



module.exports = productsRouter;
