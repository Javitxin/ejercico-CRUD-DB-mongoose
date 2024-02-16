const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    password: String,
}, { timestamps: true });

const User = mongoose.model('Task', TaskSchema);

module.exports = Task;