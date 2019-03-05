/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;

module.exports = function verifyRoleOrSelf(role, allowIfSelf) {
  return function (req, res, next) {
    const paramUserId = allowIfSelf && req.params.userId;
    const userId = req.userId;
    const db = req.app.locals.db;
    if (!userId || (allowIfSelf && !paramUserId) ) next({ status: 403, message: `No userId provided.` }); //Error
    else {
      db.collection('users').findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
        if (error) next({ status: 500, message: `Server error.`, error }); //Error
        else if (!user) next({ status: 404, message: `User not found.` }); //Error
        else {
            if (user.role < role && (!allowIfSelf || userId !== paramUserId) ) 
              next({ status: 403, message: `Not enough privilegies for this operation.` }); //Error
            else {
                delete user.password;
                replaceId(user);
                // if everything good, save user to request for use in other routes
                req.user = user;
                next();
            }
        }
      });
    }
  }
}

