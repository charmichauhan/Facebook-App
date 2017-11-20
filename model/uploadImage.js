var mongoose=require('mongoose');
var User = require('./user');

var uploadImageSchema = new mongoose.Schema({
    //image: { data: Buffer, contentType: String },
    // title:String,
    // description:String,
    // userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // commentId:[{type: mongoose.Schema.Types.ObjectId, ref: 'CommentPost'}],
    // likeId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    originalname: {
        type: String,
        required: true
    },
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var UploadImage = mongoose.model('UploadImage',uploadImageSchema);

module.exports=UploadImage;