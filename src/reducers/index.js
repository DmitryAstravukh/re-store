const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [
    // {
    //   id: 1,
    //   name: 'Book 1',
    //   count: 3,
    //   total: 150
    // },
    // {
    //   id: 2,
    //   name: 'Book 2',
    //   count: 1,
    //   total: 50
    // },
  ],
  orderTotal: 200
}

const reducer = (state = initialState, action) => {

  console.log(action.type);

  switch(action.type){
    case 'FETCH_BOOKS_REQUEST': 
      return {
        ...state,
        books: [], 
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      }

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);

      const repetitiveId = state.cartItems.findIndex(book => book.id === bookId);
      const repetitiveItem = state.cartItems[repetitiveId];

      let newItem;

      if(repetitiveId > -1) {
        newItem = {
          ...repetitiveItem, 
          count: ++repetitiveItem.count,
          total: repetitiveItem.total + book.price
        };

        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, repetitiveId),
            newItem,
            ...state.cartItems.slice(repetitiveId + 1)
          ]
        }
      }

      newItem = {
        id: book.id,
        title: book.title,
        count: 1,
        total: book.price
      };

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          newItem
        ]
      };
      

    default: return state;
  }
}

export default reducer;