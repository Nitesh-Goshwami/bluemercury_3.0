//connect to express
const express = require("express");
const cors = require("cors");
const connect = require("./config/connectionDb");

//default app port
const PORT = process.env.PORT || 3001;

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

// Controllers
const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");

// Routes
app.use("/products", productController);
app.use("/users", userController);

// Connect
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Bluemercury is connected successfully to Express. Listening on port ${PORT}.`);
  } catch (err) {
    console.error();
  }
});