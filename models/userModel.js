const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique and required email
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
