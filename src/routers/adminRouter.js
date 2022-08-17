const express = require('express');
const debug = require('debug')('app:adminRouter'); //debugging mongodb info
//mongodb = require('mongodb'); //old way
const { MongoClient } = require('mongodb'); //pulls mongoclient out directly
const sessions = require('../data/sessions.json'); // the data we want to create in our mongodb

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
   // mongodb.MongoClient //old way
   const url =
   'mongodb+srv://dbUser:ENyye8KbgTld4tOe@globomantics.l8sjom9.mongodb.net/?retryWrites=true&w=majority'
   const dbName = 'globomantics';

   //creating a little environment to run mongo in a kind of asynic/await fashion
   (async function mongo (){
       let client;

       try {
            //promise not needed because of await
            client = await MongoClient.connect(url);
            debug('connected to the mongo DB');

            const db = client.db(dbName); // giving us the database

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response); //sending back response
       } catch (error) {
           debug(error.stack);
       }
   }());
});

module.exports = adminRouter;