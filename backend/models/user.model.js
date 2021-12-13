//User model for signup

const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    order_history: [{ type: Object, required: false }],
    cart_items: [
      {
        _id: { type: String },
        prod_id_num: { type: Number },
        name: { type: String },
        title: { type: String },
        price: { type: Number },
        img: { type: String },
        category: { type: String },
        option: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        item_count: { type: Number },
      },
    ],
    wishlist_items: [{ type: Object, required: false }],
  },
  { timestamps: true, versionKey: false }
);

// creating model for user
const User = mongoose.model("user", userSchema);

// export
module.exports = User;
