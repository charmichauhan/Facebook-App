var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var loginSchema = new mongoose.Schema({
    email: {
        type: String,
        //unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
});

// authenticate input against database documents
// loginSchema.statics.authenticate = function(email, password, callback) {
//     loginUser.findOne({ email: email })
//         .exec(function (error,user){
//             if (error) {
//                 return callback(error);
//             } else if ( !user ) {
//                 var err = new Error('User not found.');
//                 err.status = 401;
//                 return callback(err);
//             }
//             bcrypt.compare(password, user.password, function(error, result){
//                 console.log('pwd--- ', password)
//                 if (result === true) {
//                     return callback(null, user);
//                 } else {
//                     return callback();
//                 }
//             })
//         });
// }
// // hash password before saving to database
// loginSchema.pre('save', function(next){
//     var loginUser = this;
//     bcrypt.hash(loginUser.password, 10, function(err, hash){
//         if (err) {
//             return next(err);
//         }
//         loginUser.password = hash;
//         next();
//     })
// });

var loginUser = mongoose.model('loginUser', loginSchema);
module.exports = loginUser;