// projects.model.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    banner: { type: String, required: true }, // Cloudinary URL
    name: { type: String, required: true },
    liveLink: { type: String }, // optional
    githubLink: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true }, // array of technologies
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
