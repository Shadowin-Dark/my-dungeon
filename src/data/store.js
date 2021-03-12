import React, { useContext, useReducer } from 'react';
import { buildMap } from './map/map';
import { initPlay } from './map/player';
import { StoreContext } from './context';
import { ajustPositions } from './actions/move';
import { FieldList } from './map/field_list';

const buildInitState = (x, y, playerNum = 1) => {
  const state = {
    map: buildMap(x, y),
    players: initPlay(playerNum),
    playerPos: [],
    focused: { x: -1, y: -1 },
    current: {
      step: 'NEW', // 'NEW', 'START', 'MOVE', 'BATTLE', 'END'
      playerID: 0,
      diceNum: 0
    },
    test: false
  };
  for (let i = 0; i < playerNum; i++) {
    state.playerPos[i] = { x: 0, y: 0 };
  }
  return state;
};

const buildSteps = (fieldID, player, step) => {
  const field = FieldList[fieldID].sideEffect;
  let trigger = '';
  switch (step) {
    case 'START': {
      trigger = 'movestart';
      break;
    }
    default: {
      break;
    }
  }
  const diceList = [];
  const funcList = [];
  let diceNum = 0;
  if (field[trigger]) {
    diceList.push(field[trigger].dice);
    funcList.push(field[trigger].func);
    diceNum += field[trigger].dice;
  }

  return { diceNum, diceList, funcList };
};

const reducer = (state, action) => {
  console.log('reduce', state, action);
  const move = (x, y, playerID) => {
    state.map[x][y].hide = false;
    ajustPositions(state.map, x, y).forEach(pos => {
      state.map[pos.x][pos.y].hide = false;
    });
    state.playerPos[playerID] = { x, y };
  };

  switch (action.type) {
    case 'RESET': {
      return { ...action.value };
    }
    case 'START_GAME': {
      state.playerPos.forEach((pos, id) => {
        move(pos.x, pos.y, id);
      });
      state.current.step = 'START';
      state.current.playerID = 0;
      state.test = true;
      return { ...state };
    }
    case 'FOCUS': {
      const { x, y } = action.value;
      if (state.focused.x === x && state.focused.y === y) {
        return state;
      }
      state.focused = { x, y };
      return { ...state };
    }
    case 'START_TURN': {
      const { current } = state;
      const { dices } = action.value || { dices: [] };
      // 计算开始回合需要的信息，包括色子数量和影响函数
      const pos = state.playerPos[current.playerID];
      const { diceNum, diceList, funcList } = buildSteps(
        state.map[pos.x][pos.y].fieldID,
        current.playerID,
        'START'
      );
      // 如果不需要色子 直接开始回合
      state.current.diceNum = diceNum;
      if (diceNum === dices.length) {
        let diceIndex = 0;
        let player = state.players[current.playerID];
        funcList.forEach((func, i) => {
          player = func(player, dices.slice(diceIndex, diceIndex + diceList[i]));
          diceIndex += diceList[i];
        });
        state.players[current.playerID] = player;
        state.current.step = 'MOVE';
        return { ...state };
      }
      return { ...state };
    }
    case 'MOVE': {
      const { x, y, playerID } = action.value;
      move(x, y, playerID);
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
    return <CMP state={state} dispatch={dispatch} />;
  });

export const Store = {
  Provider,
  Customer,
  Reset
};
