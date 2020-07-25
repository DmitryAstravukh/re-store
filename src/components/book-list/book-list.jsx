import React from 'react';
import BookListItem from './../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from './../hoc';
import { booksLoaded } from './../../actions';
import { compose } from './../../utils';
//import { bindActionCreators } from 'redux';

import './book-list.css';

class BookList extends React.Component {

  componentDidMount(){
    const { bookstoreService } = this.props; //from withBookstoreService HOC
    const data = bookstoreService.getBooks(); //from services -> bookstore-service.js
    
    this.props.booksLoaded(data);
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
};

//const mapDispatchToProps = (dispatch) => {
  // return {
  //   booksLoaded: newBooks => dispatch(booksLoaded(newBooks))
  // }
  // return bindActionCreators({ //вернет объект описанный выше
  //   booksLoaded
  // }, dispatch)
//};

//если передать просто actionCreater то он автоматом обернется в bindActionCreators
const mapDispatchToProps = { booksLoaded };

// export default withBookstoreService()(
//                   connect(mapStateToProps, 
//                           mapDispatchToProps)(BookList)
//                 ); 

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);