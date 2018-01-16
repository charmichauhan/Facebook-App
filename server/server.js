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
require('babel-core/register');
var randtoken = require('rand-token');
var multer  = require('multer')
var Temps = require('.././model/token');
var _ = require('lodash');

// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// const SENDGRID_SENDER = process.env.SENDGRID_SENDER;
// const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

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
//******** multer **********

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
const upload = multer({
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
const User=require('.././model/user.js');

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
                        const verifyLink = 'http://localhost:5000/forgot_password/' + newUser.token;
                        var mailOptions = {
                            from: 'lanetteam.charmic@gmail.com',
                            to: 'lanetteam.charmic@gmail.com',
                            subject: 'Sending Email for verification',
                            text: "You have logged in Facebook Application. This mail is just sent you to verify " +
                            "your account by below given link "  + verifyLink
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
    //console.log('path',req.files.path )
    var path = req.files.path;
    console.log('path', path)
    var imageName = req.files.originalname;
    console.log('imageName', imageName)
    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;
    console.log('path', path)
    test.originalname = path;
    console.log('---' , test.image)
    var update = {
        '$set':
        {
                username: test.username,
                email: test.email,
                role: test.role,
                password: test.password,
                originalname: test.originalname
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

//*********forgot pwd*********

app.post('/forgot_password', function(req, res, next) {
     var email = req.body.email;
     console.log('email', email)
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
         console.log('result-token', User.token);
         const verifyLink = 'http://localhost:5000/forgot_password/' + User.token;
         console.log('email',email);
         var mailOptions = {
             from: 'lanetteam.charmic@gmail.com',
             to: 'lanetteam.charmic@gmail.com',
             subject: 'Sending Email to enter new password',
             text: 'You are receiving this mail because you have requested to change the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    verifyLink + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
         };
         transporter.sendMail(mailOptions, function (error, info) {
             console.log('mailOptions',mailOptions)
             if (error) {
                 console.log(error);
                 return res.send({msg: 'error'})
             }
             res.send({msg: "Email sent"})
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

app.post('/images',upload.any('originalname'),function(req, res, next) {
        console.log('res', res)
        console.log('req', req.files)
        var path = req.files[0].path;
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
        uploadPost.originalname = 'http://localhost:6500/images/' +imageName;
        // uploadpost.title = req.body.title;
        // uploadpost.description=req.body.description;
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

app.get('/uploadData', function (req,res) {
    userData.find(function (err,test1){
        if(err){
            return res.send({msg:err});
        }
      //  return res.send({msg: "success", user: userData.toJSON()});
        res.json(test1);
    })
})
//******************** LIKES ************

var likes = require('.././model/likes')

// app.post('/likes', function (req, res) {
//     var test = new likes();
//     // var fbResponse = JSON.parse(body);
//     test.counts = req.body.counts;
//         test.save(function (err, test1) {
//             if(err)
//             {
//                 res.send(err)
//             }
//             res.json(test1);
//         })
// })

app.post('/postLikes', function (req,res) {
    var like = false;
    userData.findOne({_id:req.body.postId},function (err,resultpost) {
        debugger
        if(err){
            res.send({msg:err});
        }
        console.log('likeid---', resultpost.likeId)
        let _ = resultpost.likeId.map(function (id, index) {
            debugger
            const newId = id.toString()
            if(newId === req.body.frdId){
                like=true;
                return true
            }
        });
        if(!like){
            debugger
            userData.updateOne(
                { _id: req.body.postId },
                { $push: { likeId: req.body.frdId } }, {
                    upsert: true,
                    returnNewDocument: true
                }, function (err) {
                    debugger
                    if (err) {
                        res.send("Error while updating image in database");
                    }
                    return res.send({msg:'likes added'});
                })
           // console.log('not exist')
        }else{
            debugger
            userData.updateOne(
                { _id: req.body.postId },
                { $pull: { likeId: req.body.frdId } }, {
                    upsert: true,
                    returnNewDocument: true
                }, function (err) {
                    debugger
                    if (err) {
                        res.end("Error while update image in database");
                    }
                    return res.send({msg:'likedelete' + ''});
                })
            //console.log('exist')
        }
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
        uploadpost.frdId = req.body.frdId;
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
                    })
            })
            return res.send({msg:'Success',user: uploadpost.toJSON()});
        })
    //})
})

app.get('/comments', function (req,res) {
    comments.find().populate('postId').populate('userId').populate('frdId').exec(function (err, result) {
        if(err){
            return res.send({msg:err});
        }
        res.send({comments:result});
    })
})
//***************

app.get('/getAllUsers', function (req,res) {
console.log('data')
    userData.find()
        .populate('userId')
        .populate('commentId')
        .populate('likeId')
        .populate({
            path: 'commentId',
            model: 'comments',
            populate: {
                path: 'userId',
                model: 'User'
            }
        })
        .populate({
            path: 'commentId',
            model: 'comments',
            populate: {
                path: 'frdId',
                model: 'User'
            }
        })
        .exec(function (err, result) {
            console.log(err)
            if (err) {
                return res.send({msg: err});
            }
            res.send({posts: result});
        })
})

//******** admin**********
app.post('/admin_verification', function(req, res, next, user) {
    //check user acct verified
    //sent mail -> ur acct is not verified. Pls verify }
    //console.log('user', user)
    console.log('users')
    // if (user.isVerified)
    //     return res.send({
    //         type: 'verified',
    //         msg: 'Your account has been verified.'
    //     });
    // else {
        console.log('send for verification');
        const sgReq = Sendgrid.emptyRequest({
            method: 'POST',
           // path: '/v3/mail/send',
            body: {
                personalizations: [{
                    to: [{email: "lanetteam.charmic@gmail.com"}],
                    subject: 'Account Verification email'
                }],
                from: {email: "lanetteam.charmic@gmail.com"},
                content: [{
                    type: 'text/plain',
                    value: 'Sendgrid on Google App Engine with Node.js.'
                }]
            },
        })
        console.log('send grid');
        Sendgrid.API(sgReq, (err) => {
            if (err) {
                next(err);
                return err;
            }
            // Render the index route on success
            // res.render('/sendMail', {
            //     sent: true
            // });
        });
    //}
})

//api for delete acct
app.delete('delete_acct/username', function(req, res) {
    User.remove({username: req.params.username},function (err,test1) {
        if(err)
        {
            console.log(" API delete Error",err);
        }
        res.json(test1);
    });
});

app.listen(6500,function (err) {
    if(err){
        return console.log(err);
    }
    console.log("API Server Is running on 6500");
});
module.exports = app;

//multer, reg, login, forgot_pwd, upload img, userData, likes, comments, admin(2)