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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');


// login
router.post('/login', function (req, res) {
    const db = req.app.locals.db;
    const params = req.body;
    indicative.validate(params, {
        username: 'required|string|min:2',
        password: 'required|string|min:6|max:20'
    }).then(() => {
            db.collection('users').findOne({ username: params.username }, function (err, user) {
                if (err) error(req, res, 500, `Server error.`, err);
                else if (!user) error(req, res, 404, `User "${params.username}" not found.`);
                else {
                    const passwordIsValid = bcrypt.compareSync(params.password, user.password);
                    if (!passwordIsValid) error(req, res, 401, `Unauthorized.`);
                    else {
                        var token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        delete user.password;
                        replaceId(user);
                        res.status(200).send({ auth: true, token, user });
                    }
                }
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid username or password: ' + util.inspect(errors))
        });

});

// self register as user in student role
router.post('/register', function (req, res) {
    const db = req.app.locals.db;
    const user = req.body;
    indicative.validate(user, {
        id: 'regex:^[0-9a-f]{24}$',
        username: 'required|min:3|max:24|regex:^\\w+$',
        email: 'required|email',
        firstName: 'required|string|min:2',
        lastName: 'required|string|min:2',
        password: 'required|string|min:6',
        gender: 'regex:^\\d*$',
        role: 'required|integer|above:0|under:2' // should be in customer role
    }).then(() => {
        user.role = 1;  //Customer role is enforced
        user.password = bcrypt.hashSync(user.password, 8);
        const collection = db.collection('users');
        console.log('Inserting user:', user);
        collection.insertOne(user).then((result) => {
            if (result.result.ok && result.insertedCount === 1) {
                delete user.password;
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

module.exports = router;
