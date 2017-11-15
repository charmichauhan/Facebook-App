var mongoose = require('mongoose');
var User = require('./user')
var uploadImage = require('./uploadImage')
var userDataSchema = new mongoose.Schema({
    image: String,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // commentId:[{type: mongoose.Schema.Types.ObjectId, ref: 'CommentPost'}],
    // likeId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var userData = mongoose.model('userData', userDataSchema);
module.exports = userData

