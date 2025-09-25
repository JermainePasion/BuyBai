const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");


//get all products
router.get('/', getProducts);
//get product by id
router.get("/:id", getProduct); 
//create route
router.post("/", createProduct);
//update
router.put("/:id", updateProduct);
//delete
router.delete("/:id", deleteProduct);




module.exports = router;

