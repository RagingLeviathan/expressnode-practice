const { resolveInclude } = require('ejs');
const express = require('express');
//const auth = require('../data/auth.json'); //coming out of file
const debug = require('debug')('app:authRouter'); //debugging mongodb info
//mongodb = require('mongodb'); //old way
const { MongoClient, ObjectId } = require('mongodb');

//express hands us a bundle of code called a Router
// and that authRouter is then leveraged in order to build all of our code.
const authRouter = express.Router();

//.post
authRouter.route('/signUp').post((req, res) => {
    res.json(req.body);
})

module.exports = authRouter;