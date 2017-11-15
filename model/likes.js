var mongoose = require('mongoose');
var User = require('./user')
var LikesSchema = new mongoose.Schema({
    counts: Number,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
var likes = mongoose.model('likes', LikesSchema);
module.exports = likes;