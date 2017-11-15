var mongoose = require('mongoose');
var User = require('./user')
var commentSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
var comments = mongoose.model('comments',commentSchema);
module.exports = comments;