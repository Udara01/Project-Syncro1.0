/*const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('Design', designSchema);*/

/*const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    commentText: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const designSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    comments: [commentSchema], // Comments field with reference to User
});

module.exports = mongoose.model('Design', designSchema);*/


const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    commentText: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const designSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    uploaderEmail: { // New field to store uploader's email
        type: String,
        required: true,
    },
    comments: [commentSchema], // Comments array with userEmail reference
});

module.exports = mongoose.model('Design', designSchema);




