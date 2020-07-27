import React from 'react';
import { connect } from 'react-redux';

import Spinner from './../../components/spinner';
import ErrorIndicator from './../../components/error-indicator';
import BookList from './../../components/book-list/book-list';

import { withBookstoreService } from './../../components/hoc';
import { fetchBooks } from './../../actions';
import { compose } from './../../utils';


class BookListContainer extends React.Component {

  componentDidMount(){
    this.props.fetchBooks();
  }
  
  render(){
    const { books, loading, error } = this.props;

    if(loading) return <Spinner />

    if(error) return <ErrorIndicator />

    return <BookList books={books} /> 
  }  
  
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error }
};


const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);



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

