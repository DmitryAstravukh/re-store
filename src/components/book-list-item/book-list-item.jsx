import React from 'react';
import './book-list-item.css';

const BookListItem = ({ book, onAddedToCart }) => {
  const { title, author, price, coverImage } = book;

  return(
    <React.Fragment>
      <img className='book-list_img' src={ coverImage } alt={ title }/>
      <span className='book-list_title'>{ title }</span>
      <span className='book-list_author'>{ author }</span>
      <span className='book-list_price'>${ price }</span>
      <button
        onClick={onAddedToCart} 
        className='btn btn-info add-to-cart'>Add to cart</button>  
    </React.Fragment>
  )
}

export default BookListItem;