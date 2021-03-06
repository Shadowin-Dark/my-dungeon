import React, { useContext, useReducer } from 'react';
import { buildMap } from './map/map';
import { initPlay } from './map/player';
import { StoreContext } from './context';
import { ajustPositions } from './actions/move';

export const initState = {
  map: buildMap(5, 5),
  players: initPlay(1),
  playerPos: [{ x: 0, y: 0 }],
  focused: { x: -1, y: -1 },
  count: 1
};

export const reducer = (state, action) => {
  // console.log('reduce',state,action);
  switch (action.type) {
    case 'FOCUS': {
      const { x, y } = action.value;
      if (state.focused.x === x && state.focused.y === y) {
        return state;
      }
      state.focused = { x, y };
      return { ...state };
    }
    case 'MOVE': {
      const { x, y, playerID } = action.value;
      state.map[x][y].hide = false;
      ajustPositions(state.map, x, y).forEach(pos => {
        state.map[pos.x][pos.y].hide = false;
      });
      state.playerPos[playerID] = { x, y };
      console.log('move state', state);
      return { ...state };
    }
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
