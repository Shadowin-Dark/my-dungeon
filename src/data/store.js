import React, { useContext, useReducer } from 'react';
import { buildMap } from './map/map';
import { StoreContext } from './context';

const initState = {
  map: buildMap(5, 5)
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'move': {
      const { i, j } = action.value;
      state.map[i][j].hide = false;
      state.map[i][j].user = 1;
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

const Provider = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
});

const Customer = React.memo(({ CMP }) => {
  const { state, dispatch } = useContext(StoreContext);
  return React.cloneElement(CMP, { state, dispatch });
});

export const Store = {
  Provider,
  Customer
};
