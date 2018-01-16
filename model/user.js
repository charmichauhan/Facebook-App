var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var crypto = require('crypto'),
//     algorithm = 'aes-256-ctr',
//     password = 'd6F3Efeq';
var userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: String,
    originalname: String,
    token: String,
    isVerified: { type: Boolean, default: false }
});
// authenticate input against database documents
// userSchema.statics.authenticate = function(email, password, callback) {
//     User.findOne({ email: email })
//         .exec(function (error, user){
//             console.log('error', error)
//             if (error) {
//                 return callback(error);
//             } else if ( !user ) {
//                 var err = new Error('User not found.');
//                 err.status = 401;
//                 return callback(err);
//             }
//             bcrypt.compare(password, user.password, function(error, result){
//                 if (result === true) {
//                     return callback(null, user);
//                 } else {
//                     return callback();
//                 }
//             })
//         });
// }
//hash password before saving to database
// userSchema.pre('save', function(next){
//     var user = this;
//     bcrypt.hash(user.password, 10, function(err, hash){
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     })
// });

// function decrypt(text){
//     var decipher = crypto.createDecipher(algorithm,password)
//     var dec = decipher.update(text,'hex','utf8')
//     dec += decipher.final('utf8');
//     return dec;
// }
// debugger
// var decrypt_pwd = decrypt(password)

var User = mongoose.model('User', userSchema);
module.exports = User;
