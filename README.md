# rest_api_example
A small CRUD api example.

Setup:
* Git clone the repo
git clone git@github.com:davidahines/rest_api_example.git
* install the packages 
npm install

* Set up the database Connection
  * OPTION A: Copy the config folder I send you into the cloned directory to get the connection info to the mongo atlas.
  * OPTION B: Create a config folder with the files: dev.json, test.json, and default.json, these should contain an object with a key called "DBHost" and a value of your mongo connection string. You can create the test data using the books.json file in the root of the repo.
      
* Running the Tests to confirm the application is setup and working:
npm test
  
* Launch the server from the command line:
npm start

* Querying the api:
For example queries you can look below or look at the tests(/test folder):
  * List all books:
    GET localhost:3000/books
  * Create a book:
    POST localhost:3000/books
    body: 
      name: "The Book Name"
      author: "Author Name"
      keywords: "An array of keywords for the book"
  * Read a book:
    GET localhost:3000/books/6169c74819b370c9678d2b94
  * Update a book:
    PUT localhost:3000/books/6169c74819b370c9678d2b94
    body:
      name: "The Book Name"
      author: "Author Name"
      keywords: "An array of keywords for the book"
  * Delete a book:
    DELETE: localhost:3000/books/616adb3d8fceed8c3953088b
  * Find books by name:
    POST localhost:3000/books/search?name=Dune
  * Find books by author:
    POST localhost:3000/books/search?author=Frank Herbert
  * Find books by keyword:
    POST localhost:3000/books/search?keyword=Fantasy
