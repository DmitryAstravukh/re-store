import React from 'react';
import BookListItem from './../book-list-item';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <div className='book-list'>
      {    
        books.map(book => {
          return (
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 book-list_item'
                key={book.id}>
              <BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)}/>
            </div>
          ) 
        })
      }
    </div>
  )
} 

export default BookList; 

