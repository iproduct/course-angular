/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


// GET users list 
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('users').find().toArray(
        function (err, docs) {
            if (err) throw err;
            res.json({
                data: docs.map((user) => {
                    user.id = user._id;
                    delete (user._id);
                    return user;
                })
            });
        }
    );
});

// GET users list 
router.get('/:userId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { userId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('users', function (err, users_collection) {
                if (err) throw err;
                users_collection.findOne({ _id: new mongodb.ObjectID(params.userId) },
                    (err, user) => {
                        if (err) throw err;
                        if (user === null) {
                            error(req, res, 404, `User with Id=${params.userId} not found.`, err);
                        } else {
                            replaceId(user);
                            res.json(user);
                        }

                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid user ID: ' + util.inspect(errors))
        });
});

// Create new user
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const user = req.body;
    indicative.validate(user, {
        id: 'regex:^[0-9a-f]{24}$',
        email: 'required|email',
        fname: 'required|string|min:2',
        lname: 'required|string|min:2',
        password: 'required|string|min:6|max:20',
        role: 'required|integer|above:0|under:4'
    }).then(() => {
        const collection = db.collection('users');
        console.log('Inserting user:', user);
        collection.insertOne(user).then((result) => {
            if (result.result.ok && result.insertedCount === 1) {
                replaceId(user);
                const uri = req.baseUrl + '/' + user.id;
                console.log('Created User: ', uri);
                res.location(uri).status(201).json(user);
            } else {
                error(req, res, 400, `Error creating new user: ${user}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        })
    }).catch(errors => {
        error(req, res, 400, `Invalid user data: ${util.inspect(errors)}`);
    });
});

// PUT (edit) user by id 
router.put('/:userId', function (req, res) {
    const db = req.app.locals.db;
    const user = req.body;
    indicative.validate(user, {
        id: 'regex:^[0-9a-f]{24}$',
        email: 'required|email',
        fname: 'required|string|min:2',
        lname: 'required|string|min:2',
        password: 'required|string|min:6|max:20',
        role: 'required|integer|above:0|under:4'
    }).then(() => {
        if (user.id !== req.params.userId) {
            error(req, res, 400, `Invalid user data - id in url doesn't match: ${user}`);
            return;
        }
        const collection = db.collection('users');
        user._id = new mongodb.ObjectID(user.id);
        delete (user.id);
        console.log('Updating user:', user);
        collection.updateOne({ _id: new mongodb.ObjectID(user._id) }, { "$set": user })
            .then(result => {
                const resultUser = replaceId(user);
                if (result.result.ok && result.modifiedCount === 1) {
                    res.json(resultUser);
                } else {
                    error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(user)}`);
                }
            }).catch((err) => {
                error(req, res, 500, `Server error: ${err}`, err);
            })
    }).catch(errors => {
        error(req, res, 400, `Invalid user data: ${util.inspect(errors)}`);
    })
});

// DELETE users list 
router.delete('/:userId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { userId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('users', function (err, users_collection) {
                if (err) throw err;
                users_collection.findOneAndDelete({ _id: new mongodb.ObjectID(params.userId) },
                    (err, result) => {
                        if (err) throw err;
                        if (result.ok) {
                            replaceId(result.value);
                            res.json(result.value);
                        } else {
                            error(req, res, 404, `User with Id=${params.userId} not found.`, err);
                        }
                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid user ID: ' + util.inspect(errors))
        });
});


module.exports = router;