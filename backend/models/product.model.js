const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prod_id_num : {type:Number, required:true},
    name: {type:String, required:true},
    title: {type:String, required:true},
    price: {type:Number, required:true},
    wish: {type:String, required:false},
    img: {type:String, required:true},
    category: {type:String, required:false},
    option: {type:String, required:false},
},{
    versionKey:false,
    timestamps:true
})

const Product = mongoose.model("product",productSchema);

module.exports = Product;