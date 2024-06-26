const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'category must have a title'],
        trim: true,
        maxlength: [
            100,
            "Topic's title must be less than or equal 100 characters",
        ],
        minlength: [2, "Topic's title must be greater than 2 characters"],
    },
    url: {
        type: String,
        required: [true, 'A category must have a url'],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: [true, 'A topic must belong to a category'],
    },
});

module.exports = mongoose.model('topic', topicSchema);