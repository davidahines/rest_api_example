'use strict';
module.exports = function(app) {
  var bookController = require('../controllers/bookController');
    app.route('/books')
        .get(bookController.list_all_books)
        .post(bookController.create_a_book);

    app.route('/books/:bookId')
        .get(bookController.read_a_book)
        .put(bookController.update_a_book)
        .delete(bookController.delete_a_book);
        
    app.route('/books/search')
        .post(bookController.search);
};