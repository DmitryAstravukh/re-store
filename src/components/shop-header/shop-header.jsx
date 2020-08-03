import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './shop-header.css';

const ShopHeader = ({ cartItemsCount, orderTotal }) => {
  return (
    <header className="shop-header row">
      <Link className="logo text-dark" to="/">ReStore</Link>
      <Link className="shopping-cart" to="/cart">
        <i className="cart-icon fa fa-shopping-cart" />
        { 
        cartItemsCount > 0 ? 
            `${cartItemsCount} items (${orderTotal})` 
            : 'cart is empty' 
        }
      </Link>
    </header>
  );
};

const mapStateToProps = ({ shoppingCart: { cartItemsCount, orderTotal } }) => {
  return { cartItemsCount, orderTotal }
}

export default connect(mapStateToProps)(ShopHeader);
