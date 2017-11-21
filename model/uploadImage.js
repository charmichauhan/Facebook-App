var mongoose=require('mongoose');
var User = require('./user');

var uploadImageSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, required: true, default: Date.now},
    isApprove:{ type: Boolean, default: false }
});
var UploadImage = mongoose.model('UploadImage',uploadImageSchema);

module.exports=UploadImage;