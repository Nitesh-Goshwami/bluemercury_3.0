//User model for signup

const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    order_ids: [{ type: String, required: false }],
    cart_items: [{ type: Array, required: false }],
    wishlist_items: [{ type: Array, required: false }],
}, {timestamps: true, versionKey: false});

// creating model for user
const User = mongoose.model("user", userSchema);

// export
module.exports = User;