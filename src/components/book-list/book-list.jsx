import React from 'react';
import BookListItem from './../book-list-item';
import Spinner from './../spinner';
import ErrorIndicator from './../error-indicator';
import { connect } from 'react-redux';
import { withBookstoreService } from './../hoc';
import { fetchBooks } from './../../actions';
import { compose } from './../../utils';
//import { bindActionCreators } from 'redux';

import './book-list.css';

class BookList extends React.Component {

  componentDidMount(){
    this.props.fetchBooks();
  }
  
  render(){
    const { books, loading, error } = this.props;

    if(loading) return <Spinner />

    if(error) return <ErrorIndicator />

    return (
      <div className='book-list'>
        {    
          books.map(book => {
            return (
              <div className='col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 book-list_item'
                  key={book.id}>
                <BookListItem book={book} />
              </div>
            ) 
          })
        }
      </div>
    )
  }  
  
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error }
};

// const mapDispatchToProps = { booksLoaded, booksRequested, booksError };

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);



// const mapStateToProps = (state) => {
//   return {
//     books: state.books,
//     loading: state.loading
//   }
// };

//const mapDispatchToProps = (dispatch) => {
  // return {
  //   booksLoaded: newBooks => dispatch(booksLoaded(newBooks))
  // }
  // return bindActionCreators({ //вернет объект описанный выше
  //   booksLoaded
  // }, dispatch)
//};

//если передать просто actionCreater то он автоматом обернется в bindActionCreators
//const mapDispatchToProps = { booksLoaded, booksRequested };

// export default withBookstoreService()(
//                   connect(mapStateToProps, 
//                           mapDispatchToProps)(BookList)
//                 ); 

