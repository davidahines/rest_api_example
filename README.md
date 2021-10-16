# rest_api_example
A small CRUD api example.

Setup:
1) Git clone the repo
git clone git@github.com:davidahines/rest_api_example.git
2) install the packages 
npm install


3a) Copy the config folder I send you into the cloned directory to get the connection info to the mongo atlas.
   OR
3b) Create a config folder with the files: dev.json, test.json, and default.json, these should contain an object with a key called "DBHost" and a value of your mongo connection string. You can create the test data using the books.json file in the root of the repo.
      
4) Running the Tests to confirm the application is setup and working:
npm test
  
5) Launch the server from the command line:
npm start

6) Querying the api:
For example queries you can look below or look at the tests(/test folder):
  a) List all books:
    GET localhost:3000/books
  b) Create a book:
    POST localhost:3000/books
    body: 
      name: "The Book Name"
      author: "Author Name"
      keywords: "An array of keywords for the book"
  c) Read a book:
    GET localhost:3000/books/6169c74819b370c9678d2b94
  d) Update a book:
    PUT localhost:3000/books/6169c74819b370c9678d2b94
    body:
      name: "The Book Name"
      author: "Author Name"
      keywords: "An array of keywords for the book"
  e) Delete a book:
    DELETE: localhost:3000/books/616adb3d8fceed8c3953088b
  f) Find books by name:
    POST localhost:3000/books/search?name=Dune
  g) Find books by author:
    POST localhost:3000/books/search?author=Frank Herbert
  h) Find books by keyword:
    POST localhost:3000/books/search?keyword=Fantasy
