const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter product name"]
        },
        quantity: {
            type: Number,
            require: true, 
            default: 0

        }, 
        price: {
            type: Number,
            require: true, 
            default: 0
        },
        image: {
            type: String,
            require: true,
        },
    },

    {
        timestamps: true,
    }

);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;