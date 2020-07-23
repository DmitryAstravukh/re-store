import React from 'react';
import { Consumer } from './../bookstore-service-context';

const withBookStoreService = (Wrapped) => {
  return (props) => {
    return (
      <Consumer>
        {
          (service) => {
            return <Wrapped {...props} service={service} />
          }
        }
      </Consumer>
    )
  }
}

export default withBookStoreService;