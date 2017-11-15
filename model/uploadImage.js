var mongoose=require('mongoose');
var User = require('./user');

// var CommentPost = require('./commentPost');
// var LikePost = require('./LikePost');

var uploadImageSchema = new mongoose.Schema({
    //image: { data: Buffer, contentType: String },
    // title:String,
    // description:String,
    // userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // commentId:[{type: mongoose.Schema.Types.ObjectId, ref: 'CommentPost'}],
    // likeId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    path: {
        type: String,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    },
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var UploadImage = mongoose.model('UploadImage',uploadImageSchema);

// router.getImages = function(callback, limit) {
//     UploadProfileImage.find(callback).limit(limit);
// }
//
// router.getImageById = function(id, callback) {
//     UploadProfileImage.findById(id, callback);
// }
//
// router.addImage = function(image, callback) {
//     UploadProfileImage.create(image, callback);
// }

module.exports=UploadImage;