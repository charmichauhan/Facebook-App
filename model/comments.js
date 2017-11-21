var mongoose = require('mongoose');
var User = require('./user')
var userData = require('./userData')
var commentSchema = new mongoose.Schema({
    comment: String,
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'userData'},
    //friendId: ,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
var comments = mongoose.model('comments',commentSchema);
module.exports = comments;