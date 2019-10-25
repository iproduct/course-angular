/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  console.log(`Token: ${token}`);
  if (!token) next({ status: 403, message: `No access token provided.` }); //Error
  else {
    jwt.verify(token, config.secret, function(error, decoded) {
      if (error) next({ status: 403, message: `Failed to authenticate token.`, error });
      else {
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
      }
    });
  }
}

module.exports = verifyToken;
