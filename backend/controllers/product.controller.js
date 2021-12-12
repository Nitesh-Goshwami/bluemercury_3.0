//<------------------PRODUCT CONTROLLER-------------------->

//create a router
const { request } = require("express");
const express = require("express");
const router = express.Router();

//models
const Product = require("../models/product.model.js");


// <----------------------------------CRUD Operation for products----------------------------------->

// post products to the database 

router.post("/", async function (req, res) {
    try {
        const post = await Product.create(req.body);
        return res.status(201).send(post);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

// get all products from database

router.get("/", async function (req, res) {
    try {
        const get = await Product.find().lean().exec();
        return res.status(200).send(get);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

// get products by Id

router.get("/:id", async function (req, res) {
    try {
        const getById = await Product.findById().lean().exec();
        return res.status(200).send(getById);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

// get products by domestic Id

router.get("/query/:id", async function (req, res) {
    try {
        const getById = await Product.find({id: req.params.id}).lean().exec();
        return res.status(200).send(getById);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

// Update the products in the database

router.patch("/:id", async function (req, res) {
    try {
        const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(update);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

// delete the products from the database

router.delete("/:id", async function(req, res) {
    try {
        const remove = await Product.findByIdAndDelete(req.params.id);
        return res.status(204).send(remove);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

//export
module.exports = router;