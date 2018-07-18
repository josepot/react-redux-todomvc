import React from 'react';

export default message => Component =>
  function Logger(props) {
    console.log(message, props);
    return <Component {...props} />;
  };
