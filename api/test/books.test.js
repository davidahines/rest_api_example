//Set env to test so that it uses the test database.
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/bookModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();


chai.use(chaiHttp);
describe('Books', () => {
  // -- Clear database
  beforeEach((done) => {
    Book.deleteMany({}, (err) => {
      done();
    });
  });
  /*
    * Retrieving all books
    */
  describe('/GET books', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
        .get('/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  * Creating a book
  */
  describe('/POST books', () => {
    it('It should create a book with the required params', (done) => {
      let book = {
        author: "J.R.R. Tolkien",
        name: "The Fellowship of the Ring",
        keywords: ["Fantasy"],
      }
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body['_id'].length.should.be.eql(24);
          res.body.should.have.property('name').eql('The Fellowship of the Ring');
          res.body.should.have.property('author').eql('J.R.R. Tolkien');
          res.body.should.have.property('keywords').eql(["Fantasy"]);
          res.body.should.not.have.property('errors');
          done();
        });
    });
    it('It should not create a book with no author', (done) => {
      let book = {
        name: "The Fellowship of the Ring",
        keywords: ["Fantasy"],
      }
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('author');
          res.body.errors.author.should.have.property('kind').eql('required');
          done();
        });
    });
    it('It should not create a book with no keywords array', (done) => {
      let book = {
        name: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
      }
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('keywords');
          res.body.errors.keywords.should.have.property('name').eql('ValidatorError');
          done();
        });
    });
    it('It should not create a book with no name', (done) => {
      let book = {
        author: "J.R.R. Tolkien",
        keywords: ["Fantasy"],
      }
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });
  });


  /*
  * Retrieving a book
  */
  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      let book = new Book(
        {
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          keywords: ["Fantasy"]
        });
      book.save((err, book) => {
        chai.request(server)
          .get('/books/' + book.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('The Fellowship of the Ring');
            res.body.should.have.property('author').eql('J.R.R. Tolkien');
            res.body.should.have.property('keywords').eql(["Fantasy"]);
            res.body.should.not.have.property('errors');
            done();
          });
      });

    });
  });
  /*
  * Updating a book
  */
  describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
      let book = new Book(
        {
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          keywords: ["Fantasy"]
        });

      book.save((err, book) => {
        chai.request(server)
          .put('/books/' + book.id)
          .send({
            name: "TEST TITLE",
            author: "TEST AUTHOR",
            keywords: ["Fiction"]
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql("TEST TITLE");
            res.body.should.have.property('author').eql("TEST AUTHOR");
            res.body.should.have.property('keywords').eql(["Fiction"]);
            done();
          });
      });
    });
  });
  /*
  * Deleting a book
  */
  describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
      let book = new Book(
        {
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          keywords: ["Fantasy"]
        }
      )
      book.save((err, book) => {
        chai.request(server)
          .delete('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Book successfully deleted")

            done();
          });
      });
    });
  });

  /*
  * Deleting a book
  */
  describe('/search/:id book', () => {
    it('It should search for a book by name.', (done) => {
      let book = new Book(
        {
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          keywords: ["Fantasy"]
        }
      )
      book.save((err, book) => {
        chai.request(server)
          .post('/books/search?name='+book.name)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array');
            res.body[0].should.have.property('name').eql(book.name);
            done();
          });
      });
    });
    it('It should search for a book by author.', (done) => {
      let book = new Book(
        {
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          keywords: ["Fantasy"]
        }
      )
      book.save((err, book) => {
        chai.request(server)
          .post('/books/search?author='+book.author)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array');
            res.body[0].should.have.property('author').eql(book.author);
            done();
          });
      });
    });
  });


});