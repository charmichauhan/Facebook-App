var express = require('express');
var nodemailer = require ('nodemailer');
var flash = require('express-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var assert = require('assert');
var ejs = require('ejs');
var async = require('async');
var mongoose = require('mongoose');
var React = require('react');
var app = express();
var corsPrefetch = require('cors-prefetch-middleware');
var imagesUpload = require('images-upload-middleware');
require('babel-core/register');
var randtoken = require('rand-token');
var multer  = require('multer')
var fs = require('fs')
var Temps = require('.././model/token')

//var nev = require('email-verification')(mongoose);
//const authRoutes = require('./routes/auth');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, ''));
// app.set('view engine', 'ejs');

// app.set('', __dirname + 'index.html');
 // app.engine('html', require('ejs').renderFile);
 // app.set('view engine', 'html');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

////******** multer **********

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        console.log('file', file)
                // var filename = req.params.id + '.' + file.mimetype.split('/')[1];
                // console.log('filename----',filename.split('/')[0])
                // console.log('=---', filename)
                cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
})
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './newUploads');
//     },
//     filename: function (req, file, callback) {
//         //console.log(file)
//         var filename = req.params.id + '.' + file.mimetype.split('/')[1];
//         //console.log(filename)
//         console.log('filename----',filename.split('/')[0])
//
//         callback(null,file.originalname+'/'+filename);
//         //console.log(filename.split('-')[1])
//     }
// });
// // callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
// var upload = multer({storage: storage}).single("userPhoto");

//********Registration**************

//mongoose.connect('mongodb://charmic:lanetteam1@ds153853.mlab.com:53853/testdata');
mongoose.connect('mongodb://localhost:27017/FBapp');
var User=require('.././model/user.js');

app.post('/data',upload.any('originalname'), function(req, res) {
    var user = req.body;
    const newUser = new User(user);
    // Generate a 32 character alpha-numeric token:
    var token = randtoken.generate(32);
     //newUser.image = '';
    newUser.token = token;
    console.log(newUser);
    /////******* upload img*********
    var path = req.files[0].path;
    console.log('path', path)
    var imageName = req.files[0].originalname;
    console.log('imageName', imageName)
    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;

    newUser.image = path;
    User.findOne({email: req.body.email}, function (err, result) {
        if (err) {
            return res.send(err)
        }
        if (result === null) {
            newUser.save(function (err, result) {
                if (err) {
                    return res.send({msg: err});
                } else {
                    //res.send({msg: "Registered successfully", user: newUser})
                    console.log('Registered successfully')
                    // Create a verification token for this user
                    var token = new Temps();
                    token._userId = result._id;
                    token.token = result.token;
                    console.log('saved---', token.token);
                    // Save the verification token
                    token.save(function (err) {
                        if (err) {
                            return res.send({msg: err});
                        }
                        console.log('saved----', token)
                        // Send the email
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'lanetteam.charmic@gmail.com',
                                pass: 'chitracc123'
                            }
                        });
                        console.log(newUser.token)
                        const verifyLink = 'http://localhost:5000/emaily/' + newUser.token;
                        var mailOptions = {
                            from: 'lanetteam.charmic@gmail.com',
                            to: newUser.email,
                            subject: 'Sending Email using Node.js',
                            text: verifyLink
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            console.log(mailOptions)
                            if (error) {
                                console.log(error);
                                res.send({msg: 'registered successfully, but mail not sent', user: newUser.toJSON()})
                            } else {
                                res.send({msg: "Email sent", user: newUser})
                                console.log('Email sent: ' + info.response);
                            }
                        });

                    });
                }
            });
        } else {
            res.send({msg: 'already exist'})
        }
        console.log('result2---',result);
    })
})

// app.post('/data', function(req, res) {
//     User.findOne({email: req.body.email}, function (err, result) {
//         if(err){
//             res.send(err)
//         }else {
//             console.log('res', res)
//             if (res.length > 0) {
//                 console.log('check response')
//                 res.json({success: false, message: 'this email already exists'})
//             }
//             else {
//                 var test = new User();
//                 test.username = req.body.username;
//                 test.email = req.body.email;
//                 test.role = req.body.role;
//                 test.password = req.body.password;
//                 test.save(function (err, result) {
//                     if (err) {
//                         res.send(err);
//                     }
//                     else {
//                         res.json(test)
//                     }
//                 });
//             }
//         }
//     })
//
// });

//---------------get Data
app.get('/data',function (req,res) {
    User.find(function (err,test1) {
        if(err)
        {
            throw err;
        }
        res.send(test1);
    });
});

//------------------Delete Data
app.delete('/data/:id',function (req,res) {
    var query={_id:req.params.id};
    User.remove(query,function (err,test1) {
        if(err)
        {
            console.log("# API delete Error",err);
        }
        res.json(test1);
    });
});

app.put('/data/:id',upload.any('originalname'),function (req, res) {
    var test = req.body ;
    console.log('req.body', req.body)
    var query = req.params.id;

    var path = req.files[0].path;
    console.log('path', path)
    var imageName = req.files[0].originalname;
    console.log('imageName', imageName)
    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;
    console.log('path', path)
    test.image = path;
    console.log('---' , test.image)
    var update = {
        '$set':
        {
                username: test.username,
                email: test.email,
                role: test.role,
                password: test.password,
                image: test.image
            }};
    var options = {new : true};
    User.findOneAndUpdate(query, update, options, function (err, test2) {
        if(err){
            throw err;
        }
        res.json(test2)
    })
});
app.get('/data/:id',function (req, res) {
    User.find({_id: req.params.id},function (err,result) {
        if(err){
            return res.send({msg:err});
        }
        res.send({user:result});
    })
})

//*******************Login***********************

var loginUser=require('.././model/userLogin.js');

 app.post('/login/data', function(req, res) {

     User.findOne({email: req.body.email}, function (err, user) {
         //console.log('user---', req.body.password)
         if (!user) {
             return res.send({msg: 'The email address ' + req.body.email + ' is not correct. Check email again'});
         }
         // console.log(user.password)
         //  if(user.password === req.body.password) {
         //      if (!user.isVerified)
         //          return res.send({type: 'not-verified', msg: 'Your password is wrong.'});
              //else
                 user.token = randtoken.generate(32);
                 user.save(function (err, result) {
                     if (err) {
                         return res.send({msg: err.message});
                     }
                     console.log("Successful login.");
                     var token = new Temps();
                     token._userId = result._id;
                     token.token = result.token;
                     console.log('token', token)
                     console.log('saved---', token._userId);
                     console.log('newuser', result.token)
                     // Save the verification token
                     Temps.updateOne({_userId: result._id}, {token: result.token}, function (err, result_id) {
                         if (err) {
                             return res.send({msg: err});
                         }
                     });
                     res.send({user: user.toJSON(), token: result.token, msg: "successful login"});
                 });
                 // else {
                 //     return res.send({msg: 'Invalid email or password'})
                 // }
                 // user.comparePassword(req.body.password, function (err, isMatch) {
                 //     if (!isMatch) return res.send({msg: 'Invalid email or password'});
                 //
                 //     // Make sure the user has been verified
                 //     if (!user.isVerified) return res.send({
                 //         type: 'not-verified',
                 //         msg: 'Your account has not been verified.'
                 //     });
                 //
                 //     // Login successful, write token, and send back user
                 //     res.send({token: generateToken(user), user: user.toJSON()});
                 // });
         // else{
         //     return res.send({msg: 'Invalid email or password'})
         // }
     });
 })
// app.post('/login/data', function(req, res) {
//     loginUser.findOne({email: req.body.email}, function (err, result) {
//         if(err){
//             res.send(err)
//         }
//         else{
//             if(User.email === req.body.email){
//                 console.log('res----', req.body.email)
//                // res.json({ success: false, message: 'email is registered, you can login' });
//                 console.log('you can login now')
//                 var test = new loginUser();
//                 test.email = req.body.email;
//                 test.password = req.body.password;
//                 test.save(function(err,users) {
//                     if (err) {
//                         res.send(err);
//                     }
//                     // else { res.json(test) }
//                     // else if (test.email !==  req.body.email) {
//                     //     res.json({ success: false, message: 'Authentication failed. User not found.' });
//                     // }
//                     //  check if password matches
//                     // else if (users.password !== req.body.password) {
//                     //         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//                     // }
//                     else{
//                         res.json(test)
//                     }
//                 });
//             }
//             else{
//                 res.json({ success: false, message: 'email not registered, you cannot login' });
//             }
//         }
//     })
// });

//---------------get Data
app.get('/login/data',function (req,res) {
    loginUser.find(function (err,test1) {
        if(err)
        {
            throw err;
        }
        res.send(test1);
    });
});

//------------------Delete Data
app.delete('/login/data/:id',function (req,res) {
    var query={_id:req.params.id};
    loginUser.remove(query,function (err,test1) {
        if(err)
        {
            console.log("# API delete Error",err);
        }
        res.json(test1);
    });
});
//
// app.put('/login/data/:id',function (req, res) {
//     var test = req.body ;
//     var query = req.params.id;
//     var update = {
//         '$set':
//             {
//                 email: test.email,
//                 password: test.password,
//             }};
//
//     var options = {new : true};
//     loginUser.findOneAndUpdate(query, update, options, function (err, test2) {
//         if(err){
//             throw err;
//         }
//         res.json(test2)
//     })
// });
app.get('/login/data/:id',function (req, res) {
    loginUser.find({_id: req.params.id},function (err,result) {
        if(err){
            return res.send({msg:err});
        }
        res.send({user:result});
    })
})

//*********forgot pwd*********
// app.post('/forgot', function(req, res, next) {
//     async.waterfall([
//         function(done) {
//             crypto.randomBytes(20, function(err, buf) {
//                 var token = buf.toString('hex');
//                 done(err, token);
//             });
//         },
//         function(token, done) {
//             User.findOne({ email: req.body.email }, function(err, user) {
//                 if (!user) {
//                     req.flash('error', 'No account with that email address exists.');
//                     return res.redirect('/forgot_password');
//                 }
//                 user.resetPasswordToken = token;
//                 user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//
//                 user.save(function(err) {
//                     done(err, token, user);
//                 });
//             });
//         },
//         function(token, user, done) {
//             var smtpTransport = nodemailer.createTransport('SMTP', {
//                 service: 'SendGrid',
//                 auth: {
//                     email: 'lanetteam.charmic@gmail.com',
//                     password:'lanetteam1'
//                 }
//             });
//             var mailOptions = {
//                 to: email,
//                 from: 'charmichauhan9503@gmail.com',
//                 subject: 'Password Reset',
//                 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                 'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//             };
//             smtpTransport.sendMail(mailOptions, function(err) {
//                 req.flash('info', 'An e-mail has been sent to ' + email + ' with further instructions.');
//                 done(err, 'done');
//             });
//         }
//         //fetch email of user at reg tym
//     ], function(err) {
//         if (err) return next(err);
//         res.redirect('/');
//     });
// });
//******************reset*****

app.post('/forgot_password', function(req, res, next) {
     var email = req.params.email;
     User.findOne({email: email}, function (err, result) {
         if (err) {
             return res.send(err)
         }
         var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: 'lanetteam.charmic@gmail.com',
                 pass: 'chitracc123'
             }
         });
         User.token = randtoken.generate(32);
         //console.log(result)
         console.log('result-token', User.token);
         const verifyLink = 'http://localhost:4000/changepassword/' + User.token;
         console.log('User.email', result.email)
         var mailOptions = {
             from: 'lanetteam.charmic@gmail.com',
             to: result.email,
             subject: 'Sending Email using Node.js',
             text: verifyLink
         };
         transporter.sendMail(mailOptions, function (error, info) {
             console.log('mailOptions',mailOptions)
             if (error) {
                 console.log(error);
                 return res.send({msg: 'error'})
             }
             res.send({msg: ""})
             console.log('Email sent: ' + info.response);
         });
     });
 });
// app.get('/reset/:token', function(req, res) {
//     User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//             req.flash('error', 'Password reset token is invalid or has expired.');
//             return res.redirect('/forgot_password');
//         }
//         res.render('reset', {
//             user: req.user
//         });
//     });
// });
//*******************
//update profile api with image upload in it
//*****

//***** upload profile image***********************

var UploadImage = require('.././model/uploadImage')
// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..

app.post('/images',upload.any('originalname'),function(req, res, next) {
        console.log('res', res)
        console.log('req', req.files)
        var path = req.files.path;
        console.log('path', path)
        var imageName = req.files[0].originalname;
        console.log('imageName', imageName)
        var imagepath = {};
        imagepath['path'] = path;
        imagepath['originalname'] = imageName;
        var test1 = new UploadImage();
        test1.originalname = path;

        test1.save(function (err, result) {
            if (err) {
                console.log('error while saving', err)
                throw  err;
            }
            console.log('saving')
            res.send(result)
        });
});

// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
    UploadImage.find(function(err, genres) {
        if (err) {
            return res.send({msg:err});
        }
        res.json(genres);
    });
});
app.get('/images/:id', function(req, res) {
    UploadImage.find({id: req.params.id}, function(err, genres) {
        if (err) {
            return res.send({msg:err});
        }
       // res.send(genres.path)
        res.send({user:genres.path});
    });
});
app.delete('/images/:id',function (req,res) {
    var query={id:req.params.id};
    UploadImage.remove(query,function (err,test1) {
        if(err)
        {
            console.log("# API delete Error",err);
            return res.send({msg:err});
        }
        res.json(test1);
    });
});

///********************* userData ***************
var userData = require('.././model/userData')

app.post('/uploadData',upload.any('originalname'),function (req,res) {

        // upload(req, res, function (err, data) {
        // if (err) {
        //     return res.end("Error uploading file.");
        // }
    var path = req.files.path;
    console.log('path', path)
    var imageName = req.files[0].originalname;
    console.log('imageName', imageName)
    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;
    var test1 = new UploadImage();
    test1.originalname = path;

    const uploadPost = new userData();
        uploadPost.originalname = 'http://localhost:5000/images/' +imageName;
        //uploadPost.originalname = path;
        // uploadpost.title = req.body.title;
        // uploadpost.description=req.body.description;
       // uploadPost.imageId = req.params.id;
        uploadPost.userId = req.params.id;
        uploadPost.likesId = req.params.id;
        console.log('----', req.params.id)
        uploadPost.save(function (err) {
            if (err) {
                return res.send({msg: "Error while save image in database"});
            }
            return res.send({msg: 'Success', user: uploadPost.toJSON()});
        })
//    })
})

//******************** LIKES ************

var likes = require('.././model/likes')

app.post('/likes', function (req, res) {
    var test = new likes();
    // var fbResponse = JSON.parse(body);
    test.counts = req.body.counts;
        test.save(function (err, test1) {
            if(err)
            {
                res.send(err)
            }
            res.json(test1);
        })
})
app.get('/likes',function (req,res) {
    likes.find(function (err,test1) {
        if(err)
        {
            res.send(err)
        }
        res.json(test1);
    });
});

//*************** Comments **************
var comments = require('.././model/comments')

app.post('/comments', upload.any('originalname'),function (req,res) {
    //upload(req, res, function (err, data) {
        // if (err) {
        //     return res.end("Error uploading file.");
        // }
        const uploadpost = new comments();
        uploadpost.postId=req.body.postId;
        uploadpost.userId = req.body.userId;
        //uploadpost.frdId = req.body.frdId;
        uploadpost.comment = req.body.comment;
        console.log('comment obj---',uploadpost)
        uploadpost.save(function (err) {
            if (err) {
                return res.end({msg:"Error while saving image in database"});
            }
            userData.findOne({_id:req.body.postId},function (err,result) {
                console.log('result', result)
                debugger
                if(err){
                    res.send({msg:err});
                }
                userData.updateOne(
                    { _id: req.body.postId },
                    { $push: { commentId: uploadpost._id } }, {
                        upsert: true,
                        returnNewDocument: true
                    }, function (err) {
                        debugger
                        if (err) {
                            res.end({msg:"Error while updating image in database"});
                        }
                        // res.end({msg:'Success'});
                    })
                //return res.send({msg:'Success'});
            })
            return res.send({msg:'Success',user: uploadpost.toJSON()});
        })
    //})
})

app.listen(5000,function (err) {
    if(err){
        return console.log(err);
    }
    console.log("API Server Is running on 5000");
});

module.exports = app;