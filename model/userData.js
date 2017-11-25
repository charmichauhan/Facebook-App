var mongoose = require('mongoose');
var User = require('./user')
var likes = require('./likes')
var comments = require('./comments')
var userDataSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    originalname: {type: String},
    commentId:[{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    likeId:{type: mongoose.Schema.Types.ObjectId, ref:'likes'},
    frdId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var userData = mongoose.model('userData', userDataSchema);
module.exports = userData
