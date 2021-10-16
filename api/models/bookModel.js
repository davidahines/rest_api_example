
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notEmpty = function(features){
  if(features.length === 0){return false}
  else {return true};
}

var BookSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the book name.'
  },
  author: {
    type: String,
    required: 'Please enter the book author.'
  },
  keywords: {
    type: [String],
    required: true,
    //validate: v => v==null || v.length > 0,
    validate: [notEmpty, 'Please add at least one keyword.']
  }
});

module.exports = mongoose.model('Books', BookSchema);