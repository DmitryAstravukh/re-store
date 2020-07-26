import React from 'react';
import BookListItem from './../book-list-item';
import Spinner from './../spinner';
import { connect } from 'react-redux';
import { withBookstoreService } from './../hoc';
import { booksLoaded, booksRequested } from './../../actions';
import { compose } from './../../utils';
//import { bindActionCreators } from 'redux';

import './book-list.css';

class BookList extends React.Component {

  componentDidMount(){
    const { bookstoreService, booksLoaded, booksRequested } = this.props; //from withBookstoreService HOC
    booksRequested();
    bookstoreService.getBooks()
      .then(data => { booksLoaded(data) }) //from services -> bookstore-service.js 
    
  }
  
  render(){
    const { books, loading } = this.props;

    if(loading) return <Spinner />

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

const mapStateToProps = ({ books, loading }) => {
  return { books, loading }
};

const mapDispatchToProps = { booksLoaded, booksRequested };

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

