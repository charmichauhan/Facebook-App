var mongoose = require('mongoose');
var User = require('./user')
var likes = require('./likes')
var uploadImage = require('./uploadImage');
var userDataSchema = new mongoose.Schema({
    //imageId: {type: mongoose.Schema.Types.ObjectId, ref: 'uploadImage'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    originalname:String,
  //  commentId:[{type: mongoose.Schema.Types.ObjectId, ref: 'CommentPost'}],
    likeId:{type: mongoose.Schema.Types.ObjectId, ref:'likes'},
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var userData = mongoose.model('userData', userDataSchema);
module.exports = userData
