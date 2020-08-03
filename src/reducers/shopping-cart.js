const updateCartItems = (cartItems, item, idx) => {
  
  if(item.count === 0){
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ]
  }
  
  if(idx === -1){
    return [
      ...cartItems,
      item
    ]
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
}

const updateCartItem = (book, item = {}, quantity) => { 
  const { 
    id = book.id, 
    count = 0, 
    title = book.title, 
    total = 0
  } = item;
  
  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  }
}

const updateOrderTotal = (cartItems) => {
  if(cartItems.length === 1) return cartItems[0].total;

  if(cartItems.length > 1) {
    return cartItems.reduce((summ, curr) => summ.total + curr.total)
  }

  return 0;
}

const updateOrder = (state, bookId, quantity) => {
  const { bookList: { books }, shoppingCart: { cartItems } } = state;

  const book = books.find(book => book.id === bookId);
  const itemIndex = cartItems.findIndex(book => book.id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);

  const actualCartItems = updateCartItems(cartItems, newItem, itemIndex);

  return {
    cartItems: actualCartItems,
    orderTotal: updateOrderTotal(actualCartItems),
    cartItemsCount: actualCartItems.length
  }
}


const updateShoppingCart = (state, action) => {
  if(state === undefined){
    return {
      cartItems: [],
      orderTotal: 0
    }
  }

  switch(action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shoppingCart.cartItems.find(book => book.id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    default: return state.shoppingCart
  }
}

export default updateShoppingCart;