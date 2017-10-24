/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

exports.replaceId = function (entity) {
  entity.id = entity._id;
  delete (entity._id);
  return entity;
}

exports.sendErrorResponse = function (req, res, statusCode, message, error) {
  // development error handler
  // will print stacktrace
  if (req.get('env') === 'development') {
    res.status(statusCode || 500);
    res.json({
      'error': [{
        message,
        error: error || {}
      }]
    });
  } else {
    // production error handler
    // no stacktraces leaked to user
    res.status(statusCode || 500);
    res.json({
      'error': [{
        message,
        error: {}
      }]
    });
  }
}

