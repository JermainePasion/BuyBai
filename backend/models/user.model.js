const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter Username"],
        },
        password: {
            type: String, 
            required: [true, "Please Enter Password"],

        }
    },

    {
        timestamp: true, 
    },

);








const User = mongoose.model("User", UserSchema);

module.exports = User;