const express = require("express");

const ctrl = require("../controllers/reviewsControllers");

const reviewsRouter = express.Router();

reviewsRouter.get("/", ctrl.getAllReviews);

module.exports = reviewsRouter;
