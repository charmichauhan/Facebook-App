var mongoose = require('mongoose');
var User = require('./user')
var userData = require('./userData')
var LikesSchema = new mongoose.Schema({
    //counts: Number,
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'userData'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    frdId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    comment: String,
});
var likes = mongoose.model('likes', LikesSchema);
module.exports = likes;