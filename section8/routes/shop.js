const path = require("path");

const express = require("express");

const productsConstroller = require("../controllers/products");

const router = express.Router();

router.get("/", productsConstroller.getProducts);

module.exports = router;
