const mongoose = require("../config/database")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },

    friend: {
        type: mongoose.ObjectId,
        ref: "User",
        required: false,
    },
})

const User = mongoose.model("User", UserSchema)

module.exports = User
