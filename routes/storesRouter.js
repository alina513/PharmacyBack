const express = require("express");

const ctrl = require("../controllers/storesControllers.js");

const storesRouter = express.Router();

storesRouter.get("/", ctrl.getAllStores);

module.exports = storesRouter;
