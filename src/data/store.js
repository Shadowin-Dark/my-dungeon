import React, { useContext, useReducer } from 'react';
import { buildMap } from './map/map';
import { StoreContext } from './context';

export const initState = {
  map: buildMap(5, 5),
  focused: { x: -1, y: -1 },
  count: 1
};

export const reducer = (state, action) => {
  // console.log('reduce',state,action);
  switch (action.type) {
    case 'FOCUS': {
      const { x, y } = action.value;
      state.focused = { x, y };
      return { ...state };
    }
    // case 'MOVE': {
    //   const { i, j } = action.value;
    //   state.map[i][j].hide = false;
    //   state.map[i][j].user = 1;
    //   break;
    // }
    default:
      return state;
  }
};

const Provider = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
});

const Customer = CMP =>
  React.memo(() => {
    const { state, dispatch } = useContext(StoreContext);
    // const actions = {
    //   focus: (x,y) => dispatch({type:'FOCUS', value:{x,y}}),
    // move: (x,y) =>
    // }
    return <CMP state={state} dispatch={dispatch} />;
  });

export const Store = {
  Provider,
  Customer
};
