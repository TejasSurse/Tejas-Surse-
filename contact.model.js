const mongoose = require('mongoose');

// Define the schema for contact messages
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    receivedAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the model from the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
