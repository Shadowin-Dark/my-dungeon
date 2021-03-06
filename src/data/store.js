import React, { useContext, useReducer } from 'react';
import { buildMap } from './map/map';
import { initPlay } from './map/player';
import { StoreContext } from './context';
import { ajustPositions } from './actions/move';

const buildInitState = (x, y, playerNum = 1) => {
  const state = {
    map: buildMap(x, y),
    players: initPlay(playerNum),
    playerPos: [],
    focused: { x: -1, y: -1 }
  };
  for (let i = 0; i < playerNum; i++) {
    state.playerPos[i] = { x: 0, y: 0 };
  }
  return state;
};

const reducer = (state, action) => {
  // console.log('reduce',state,action);
  switch (action.type) {
    case 'RESET': {
      return action.value;
    }
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
      return { ...state };
    }
    default:
      return state;
  }
};

const Reset = ({ size, playerNum, dispatch }) => {
  const { x, y } = size;
  const initState = buildInitState(x, y, playerNum);
  dispatch({ type: 'RESET', value: initState });
};

const Provider = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, buildInitState(0, 0));

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
  Customer,
  Reset
};
