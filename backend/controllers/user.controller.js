const express = require("express");
const router = express.Router();

//models
const User = require("../models/user.model");

// <----------------------------------CRUD Operation for users----------------------------------->

// Get all users
router.get("/", async (request, response) => {
  try {
    const results = await User.find().lean().exec();
    return response.send(results);
  } catch (err) {
    response.status(401).send(err.message);
  }
});

// Login credentials check using email and password
router.post("/login/", async (req, res) => {
  try {
    // tempResult to check email only
    const tempResult = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (tempResult) {
      // result to check email and password
      let result = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      })
        .lean()
        .exec();
      if (result) {
        res.status(201).send(result);
      } else {
        return res.status(402).send({ message: "wrong password" });
      }
    } else {
      return res.status(401).send({ message: "user not found" });
    }
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

// Get user by id
router.get("/:id", async (request, response) => {
  try {
    const results = await User.findById(request.params.id);
    return response.status(200).send(results);
  } catch (err) {
    response.status(401).send(err.message);
  }
});

// Post (Sign up) using email and password
router.post("/signup", async (request, response) => {
  try {
    const results = await User.create(request.body);
    return response.status(201).send(results);
  } catch (err) {
    if (err.message.substring("dup key")) {
      response.status(403).send(err.message);
    } else {
      response.status(401).send(err.message);
    }
  }
});

// update user details by id
router.patch("/:id", async (request, response) => {
  try {
    const results = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    return response.send(results);
  } catch (err) {
    response.status(401).send(err.message);
  }
});

// delete user by id
router.delete("/:id", async (request, response) => {
  try {
    const results = await User.findByIdAndDelete(request.params.id);
    return response.status(204).send(results);
  } catch (err) {
    response.status(401).send(err.message);
  }
});

// Update Cart
router.put("/cart/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const results = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          cart: req.body,
        },
      }
    );

    const userData = await User.find().lean().exec();
    return res.status(201).send(userData);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

// update the order and empty the cart
router.put("/order/:id", async (req, res) => {
  try {
    const results = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          cart: { cart_items: [], total_items: 0, total_price: 0},
          order_history: req.body.orderData
        },
      }
    );

    const userData = await User.find().lean().exec();
    return res.status(201).send(userData);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

//export
module.exports = router;
