const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    forgotPassword, 
    updatePassword
} = require('../controllers/auth.controller');
// const forgot = require('../controllers/forgot.controller');

router.post('/register', registerUser)
    .post('/login', loginUser)
    .put('/forgot', forgotPassword)
    .put('/updatepassword', updatePassword);

module.exports = router;