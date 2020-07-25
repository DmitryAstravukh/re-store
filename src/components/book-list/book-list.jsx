import React from 'react';
import BookListItem from './../book-list-item';
import { connect } from 'react-redux';

import './book-list.css';

class BookList extends React.Component {

  componentDidMount(){
    
  }
  
  render(){
    const { books } = this.props;

    return (
      <ul>
        {    
          books.map(book => {
            return (
              <li key={book.id}>
                <BookListItem book={book} />
              </li>
            ) 
          })
        }
      </ul>
    )
  }  
  
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(BookList); 