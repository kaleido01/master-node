const path = require("path");

const express = require("express");

const shopConstroller = require("../controllers/shop");

const router = express.Router();

router.get("/", shopConstroller.getIndex);
router.get("/products", shopConstroller.getProducts);
router.get("/products/:productId", shopConstroller.getProduct);
router.get("/cart", shopConstroller.getCart);
router.post("/cart", shopConstroller.postCart);
router.post("/cart-delete-item", shopConstroller.postCartDeleteProduct);
router.get("/orders", shopConstroller.getOrders);
router.get("/checkout", shopConstroller.getCheckout);

module.exports = router;
