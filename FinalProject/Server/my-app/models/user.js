const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    career: { type: String, required: false },
    skills: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema, 'user');
