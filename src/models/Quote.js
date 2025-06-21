// src/models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Quote text is required'],
    trim: true,
    minlength: [10, 'Quote must be at least 10 characters long'],
    maxlength: [500, 'Quote cannot exceed 500 characters'],
  },
  author: {
    type: String,  
    required: [true, 'Author is required'],
    trim: true,
    default: 'Unknown', 
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Bible', 'Psychology', 'Personal Development', 'General'], // Enforce allowed categories
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, 
});


quoteSchema.index({ category: 1 });

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;