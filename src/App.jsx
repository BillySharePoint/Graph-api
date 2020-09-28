import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { basicReduxStore } from './basicReduxStore';

import InsiderApp from './InsiderApp';

const App = () => {
  return (
    <Provider store={basicReduxStore}>
      <InsiderApp />
    </Provider>
  );
};

export default App;
