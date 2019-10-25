/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for
 * non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


// GET products list
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('products').find().toArray(
        function (err, products) {
            if (err) throw err;
            products.forEach( (product) => replaceId(product) );
            res.json({ data: products });
        }
    );
});

// GET products list
router.get('/:productId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validator.validate(params, { productId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('products', function (err, products_collection) {
                if (err) throw err;
                products_collection.findOne({ _id: new mongodb.ObjectID(params.productId) },
                    (err, product) => {
                        if (err) throw err;
                        if (product === null) {
                            error(req, res, 404, `Product with Id=${params.productId} not found.`, err);
                        } else {
                            replaceId(product);
                            res.json(product);
                        }

                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid product ID: ' + util.inspect(errors))
        });
});

// Create new product
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const product = req.body;
    indicative.validator.validate(product, {
      id: 'regex:^[0-9a-fA-F]{24}$',
      name: 'required|string|min:2',
      price: 'required|regex:^\\d+(\\.\\d+)?$',
      description: 'string'
    }).then(() => {
        const collection = db.collection('products');
        console.log('Inserting product:', product);
        collection.insertOne(product).then((result) => {
            if (result.result.ok && result.insertedCount === 1) {
                replaceId(product);
                const uri = req.baseUrl + '/' + product.id;
                console.log('Created Product: ', uri);
                res.location(uri).status(201).json(product);
            } else {
                error(req, res, 400, `Error creating new product: ${product}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        })
    }).catch(errors => {
        error(req, res, 400, `Invalid product data: ${util.inspect(errors)}`);
    });
});

// PUT (edit) product by id
router.put('/:productId', function (req, res) {
    const db = req.app.locals.db;
    const product = req.body;
    indicative.validator.validate(product, {
      id: 'required|regex:^[0-9a-fA-F]{24}$',
      name: 'required|string|min:2',
      price: 'required|regex:^\\d+(\\.\\d+)?$',
      description: 'string'
    }).then(() => {
        if (product.id !== req.params.productId) {
            error(req, res, 400, `Invalid product data - id in url doesn't match: ${product}`);
            return;
        }
        const collection = db.collection('products');
        product._id = new mongodb.ObjectID(product.id);
        delete (product.id);
        console.log('Updating product:', product);
        collection.updateOne({ _id: new mongodb.ObjectID(product._id) }, { "$set": product })
            .then(result => {
                const resultProduct = replaceId(product);
                if (result.result.ok && result.modifiedCount === 1) {
                    res.json(resultProduct);
                } else {
                    error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(product)}`);
                }
            }).catch((err) => {
                error(req, res, 500, `Server error: ${err}`, err);
            })
    }).catch(errors => {
        error(req, res, 400, `Invalid product data: ${util.inspect(errors)}`);
    })
});

// DELETE products list
router.delete('/:productId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validator.validate(params, { productId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('products', function (err, products_collection) {
                if (err) throw err;
                products_collection.findOneAndDelete({ _id: new mongodb.ObjectID(params.productId) },
                    (err, result) => {
                        if (err) throw err;
                        if (result.ok) {
                            replaceId(result.value);
                            res.json(result.value);
                        } else {
                            error(req, res, 404, `Product with Id=${params.productId} not found.`, err);
                        }
                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid product ID: ' + util.inspect(errors))
        });
});


module.exports = router;
