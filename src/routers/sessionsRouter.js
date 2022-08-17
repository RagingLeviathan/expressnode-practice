const express = require('express');
//const sessions = require('../data/sessions.json'); //coming out of file
const debug = require('debug')('app:sessionsRouter'); //debugging mongodb info
//mongodb = require('mongodb'); //old way
const { MongoClient, ObjectId } = require('mongodb');
const sessions = require('../data/sessions.json'); //coming out of mongodb

//express hands us a bundle of code called a Router
// and that sessionRouter is then leveraged in order to build all of our code.
const sessionsRouter = express.Router();

//old way
// sessionRouter.route('/')
//     .get((req, res) => {
//         //res.send('hello session');


//         res.render('sessions', {
//             //hardcoding it
//             //     {
//             //         title: 'Session 1',
//             //         description: 'this is session 1'
//             //     },
//             //     {
//             //         title: 'Session 2',
//             //         description: 'this is session 2'
//             //     },
//             //     {
//             //         title: 'Session 3',
//             //         description: 'this is session 3'
//             //     },
//             //     {
//             //         title: 'Session 4',
//             //         description: 'this is session 4'
//             //     }]

//             //load from json file
//             //pulling out all sessions
//             sessions,
//         }); //looks for sessions.ejs page
//     });

//comimg from mongodb way ;
sessionsRouter.route('/')
    .get((req, res) => {
        // mongodb.MongoClient //old way
        const url =
            'mongodb+srv://dbUser:ENyye8KbgTld4tOe@globomantics.l8sjom9.mongodb.net/?retryWrites=true&w=majority'
        const dbName = 'globomantics';

        //creating a little environment to run mongo in a kind of asynic/await fashion
        (async function mongo() {
            let client;

            try {
                //promise not needed because of await
                client = await MongoClient.connect(url);
                debug('connected to the mongo DB');

                const db = client.db(dbName); // giving us the database

                //pulls everything out of database that is in 'sessions'
                const sessions = await db.collection('sessions').find().toArray();
                res.render('sessions', { sessions }); //sending back response
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    });

sessionsRouter.route('/:id')
    .get((req, res) => {

        const id = req.params.id;
        //old way
        // res.render('session', {
        //     session: sessions[id]});

        // mongodb.MongoClient //old way
        const url =
            'mongodb+srv://dbUser:ENyye8KbgTld4tOe@globomantics.l8sjom9.mongodb.net/?retryWrites=true&w=majority'
        const dbName = 'globomantics';

        //creating a little environment to run mongo in a kind of asynic/await fashion
        (async function mongo() {
            let client;

            try {
                //promise not needed because of await
                client = await MongoClient.connect(url);
                debug('connected to the mongo DB');

                const db = client.db(dbName); // giving us the database

                //pulls everything out of database that is in 'sessions'
                const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});

                res.render('session', { 
                    session,
                }); //sending back single session response
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    });

module.exports = sessionsRouter;