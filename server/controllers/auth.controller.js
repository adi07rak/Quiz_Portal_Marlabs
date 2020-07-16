const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/users.model');
const authService = require('../services/auth.service');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb7c06ec1fc7b413c95446355c7fa86c2.mailgun.org';
const mg = mailgun({ apiKey: 'c8bba50aa35342c3dcca2b6095d9d2b1-1b6eb03d-b94e973c', domain: DOMAIN });


module.exports.registerUser = (req, res) => {
    var userDetailsModel = new userModel();
    userDetailsModel.traineeId = req.body.traineeId;
    userDetailsModel.firstName = req.body.firstName;
    userDetailsModel.lastName = req.body.lastName;
    userDetailsModel.email = req.body.email;
    userDetailsModel.recruiterName = req.body.recruiterName;
    userDetailsModel.devDomain = req.body.devDomain;
    userDetailsModel.password = req.body.password;
    authService.registerUser(userDetailsModel, res);
};

module.exports.loginUser = async (req, res) => {
    const userDetails = await userModel.find({
        traineeId: req.body.traineeId
    });
    console.log('==> ', userDetails);
    if (userDetails.length === 1 &&
        userDetails[0].traineeId === req.body.traineeId) {
        if (userDetails[0].password === req.body.password) {
            const id = userDetails[0].traineeId;
            const token = jwt.sign({ 'traineeId': id }, 'iambatman', { expiresIn: '1h' });
            res.status(200).send({
                message: "Valid User",
                status: { traineeId: true, password: true },
                token: token
                // userdetails: userDetails[0]
            });
        } else {
            res.status(403).send({
                message: "Invalid Password.",
                status: { traineeId: true, password: false }
            });
        }
    } else {
        res.status(403).send({
            message: "Invalid Trainee Id.",
            status: { traineeId: false, password: false }
        });
    }

};

module.exports.forgotPassword = async (req, res) => {
    let userDetails = {};
    userModel.findOne({ traineeId: req.body.traineeId }, (error, data) => {
        if (!error && data && data !== null) {
            console.log('data::', data); 
            userDetails =  data;
        } else {
            console.log('error:::', error);
            res.status(403).send({
                message: "Invalid Trainee Id",
                status: false
            }); 
        }
        if (userDetails && userDetails.traineeId === req.body.traineeId) {
            const id = userDetails._id
            const token = jwt.sign({ 'traineeId': id }, 'iambatman', { expiresIn: '20m' });
            const emailInfo = {
                from: 'noreplyTo@quiz-portal.com',
                to: 'adityarjani5@gmail.com',
                subject: 'Hello',
                text: `Testing some Mailgun awesomness!
                Click here: http://localhost:4200/auth/resetpass/${token}?id=${id} `
            };
            userModel.findOneAndUpdate({ _id: id }, { resetLink: token }, { new: true }, (err, data) => {
                if (!err) {
                    // console.log(':::',data);
                    mg.messages().send(emailInfo, function (error, body) {
                        console.log(body);
                        res.status(200).send({
                            message: "Email Sent",
                            status: true
                        });
                    });
                } else {
                    console.log('error:::', err);
                    res.status(403).send({
                        message: "Invalid Trainee Id",
                        status: false
                    });
                }
            });
    
    
        }
    });
    // console.log(':::', userDetails);
    
};

module.exports.updatePassword = async (req, res) => {
    userModel.findOneAndUpdate({ _id: req.body._id, resetLink: req.body.resetLink }, req.body, { new: true }, (err, data) => {
        if (err) {
            // console.log('error:::', err);
            res.status(403).send({
                message: "Error",
                status: false
            });
        } else {
            // console.log('data:::', data);
            res.status(200).send({
                message: "Password successfully updated!",
                status: true
            });
        }
    });
};
