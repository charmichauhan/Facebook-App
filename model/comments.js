var mongoose = require('mongoose');
var User = require('./user')
var userData = require('./userData')
var commentSchema = new mongoose.Schema({
    comment: String,
    count: Number,
    frdId: {type: mongoose.Schema.Types.ObjectId, ref:'User'} ,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'userData'},
});
var comments = mongoose.model('comments',commentSchema);
module.exports = comments;