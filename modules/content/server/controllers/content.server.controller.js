'use strict';

var mongoose = require('mongoose'),
  _ = require('lodash'),
  path = require('path'),
  Content = mongoose.model('Content'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.write = function(req, res) {

  var part = req.files.file;

  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    content_type:part.mimetype
  });

  writeStream.on('close', function(file) {
    var meta = new Content({
      mimeType: file.contentType,
      fileId: file._id,
      created: file.uploadDate,
      name: file.fileName,
      size: file.length,
      user: req.user._id
    });
    return meta.save(function(err, data) {
      res.status(200).send(data);
    });
  });

  writeStream.write(part.data);
  writeStream.end();
};

exports.read = function(req, res) {

  gfs.findOne({_id: req.params.id}, function (err, file) {

    if (!file){
      return res.status(404).send();
    }

    res.writeHead(200, {'Content-Type': file.contentType});

    var readstream = gfs.createReadStream({
      filename: file.filename
    });

    readstream.on('data', function(data) {
      res.write(data);
    });

    readstream.on('end', function() {
      res.end();
    });

    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
};

exports.delete = function(req, res) {
  var _id = req.params.fileId;
  gfs.remove({_id: _id}, function (err) {
    if (err) return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
    else res.send();
  });
};

exports.list = function(req, res) {
  Content.find().sort('-created').populate('user', 'displayName').exec(function (err, contents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contents);
    }
  });
};