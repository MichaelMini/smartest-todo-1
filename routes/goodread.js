"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {
  var goodreads = new SimpleGoodreads();
  goodreads.searchBook('Harry Potter', function (err, book) {
    // book is retrieved
    console.log(book.id); // 3
    console.log(book.title); // Harry Potter and the Sorcerer\'s Stone (Harry Potter, #1)
    console.log(book.author); // J.K. Rowling
    console.log(book.publication_year); // 1997
    console.log(book.rating); // 4.40
  });
}
