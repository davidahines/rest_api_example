'use strict';


var mongoose = require('mongoose'),
  Book = mongoose.model('Books');

exports.list_all_books = function(req, res) {
  Book.find({}, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.create_a_book = function(req, res) {
  var new_book = new Book(req.body);
  new_book.save(function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.read_a_book = function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.update_a_book = function(req, res) {
  Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.delete_a_book = function(req, res) {
  Book.deleteOne({
    _id: req.params.bookId
  }, function(err, book) {
    if (err)
      res.send(err);
    res.json({ message: 'Book successfully deleted' });
  });
};

exports.search= function(req, res) {
  var queryObject = {};
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
        queryObject[propName] = req.query[propName];
    }
  }
  Book.find(queryObject, function(err, books) {
    if (err)
      res.send(err);
    res.json(books);
  });
};