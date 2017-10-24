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


// GET tests list 
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('tests').find().toArray(
        function (err, docs) {
            if (err) throw err;
            res.json({
                data: docs.map((test) => {
                    test.id = test._id;
                    delete (test._id);
                    // Patching data
                    if(typeof test.difficulty !== 'number'){
                        test.difficulty = 2;
                    }
                    if(!test.dateCreated){
                        test.dateCreated = Date.now();
                    }
                    if(!test.questions){
                        test.questions = [];
                    } else {
                        test.questions = test.questions // fix null answer questions
                            .map(q => {
                                if(!q.answers) {
                                    q.answers = [];
                                } 
                                return q;
                            });
                    }
                    return test;
                })
            });
        }
    );
});

// GET tests list 
router.get('/:testId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { testId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('tests', function (err, tests_collection) {
                if (err) throw err;
                tests_collection.findOne({ _id: new mongodb.ObjectID(params.testId) },
                    (err, test) => {
                        if (err) throw err;
                        if (test === null) {
                            error(req, res, 404, `Test with Id=${params.testId} not found.`, err);
                        } else {
                            replaceId(test);
                            res.json(test);
                        }

                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid test ID: ' + util.inspect(errors))
        });
});

// Create new test
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const test = req.body;
    indicative.validate(test, {
        id: 'regex:^[0-9a-f]{24}$',
        title: 'required|string|min:2',
        difficulty: 'required|integer|above:0|under:5',
        description: 'string',
        author: 'required|string|min:2',
        license: 'required|integer|above:0|under:20',
        dateCreated: 'required|integer|above:0',
        dateModified: 'required|integer|above:0',
        questions: 'array'
    }).then(() => {
        const collection = db.collection('tests');
        console.log('Inserting test:', test);
        collection.insertOne(test).then((result) => {
            if (result.result.ok && result.insertedCount === 1) {
                replaceId(test);
                const uri = req.baseUrl + '/' + test.id;
                console.log('Created Test: ', uri);
                res.location(uri).status(201).json(test);
            } else {
                error(req, res, 400, `Error creating new test: ${test}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        })
    }).catch(errors => {
        error(req, res, 400, `Invalid test data: ${util.inspect(errors)}`);
    });
});

// PUT (edit) test by id 
router.put('/:testId', function (req, res) {
    const db = req.app.locals.db;
    const test = req.body;
    indicative.validate(test, {
        id: 'required|regex:^[0-9a-f]{24}$',
        title: 'required|string|min:2',
        difficulty: 'required|integer|above:0|under:5',
        description: 'string',
        author: 'required|string|min:2',
        license: 'required|integer|above:0|under:20',
        dateCreated: 'required|integer|above:0',
        dateModified: 'required|integer|above:0',
        questions: 'array'
    }).then(() => {
        if (test.id !== req.params.testId) {
            error(req, res, 400, `Invalid test data - id in url doesn't match: ${test}`);
            return;
        }
        const collection = db.collection('tests');
        test._id = new mongodb.ObjectID(test.id);
        delete (test.id);
        console.log('Updating test:', test);
        collection.updateOne({ _id: new mongodb.ObjectID(test._id) }, { "$set": test })
            .then(result => {
                const resultTest = replaceId(test);
                if (result.result.ok && result.modifiedCount === 1) {
                    res.json(resultTest);
                } else {
                    error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(test)}`);
                }
            }).catch((err) => {
                error(req, res, 500, `Server error: ${err}`, err);
            })
    }).catch(errors => {
        error(req, res, 400, `Invalid test data: ${util.inspect(errors)}`);
    })
});

// DELETE tests list 
router.delete('/:testId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { testId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('tests', function (err, tests_collection) {
                if (err) throw err;
                tests_collection.findOneAndDelete({ _id: new mongodb.ObjectID(params.testId) },
                    (err, result) => {
                        if (err) throw err;
                        if (result.ok) {
                            replaceId(result.value);
                            res.json(result.value);
                        } else {
                            error(req, res, 404, `Test with Id=${params.testId} not found.`, err);
                        }
                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid test ID: ' + util.inspect(errors))
        });
});


module.exports = router;