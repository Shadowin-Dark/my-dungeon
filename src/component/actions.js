import React, { useState } from 'react';

import { Store } from '../data/store';

import styles from './actions.modules.css';

const roll = num => {
  const l = [];
  for (let i = 0; i < num; i++) {
    l.push(Math.ceil(Math.random() * 6));
  }
  return l;
};

export const Actions = Store.Customer(
  React.memo(props => {
    const { state, dispatch } = props;
    // const { focused } = state;
    const { step, playerID, diceNum } = state.current;

    const [dices, setDices] = useState([]);

    switch (step) {
      case 'NEW': {
        return (
          state.map.length !== 0 && (
            <button
              className={styles.button}
              type="submit"
              onClick={() => {
                dispatch({ type: 'START_GAME' });
              }}
            >
              Start Game
            </button>
          )
        );
      }
      case 'START': {
        return (
          <>
            <button
              className={styles.button}
              type="submit"
              onClick={() => {
                dispatch({ type: 'START_TURN', value: { dices } });
                setDices([]);
              }}
            >{`Start Player-${playerID} Turn`}</button>
            {diceNum > 0 && (
              <button
                className={styles.button}
                type="submit"
                onClick={() => {
                  setDices(roll(diceNum));
                }}
              >
                {`Roll ${diceNum} Dices`}
              </button>
            )}
            {dices.length > 0 && <p>{dices.reduce((a, b) => `${a} ${b}`)}</p>}
          </>
        );
      }
      default: {
        return <div>nothing</div>;
      }
    }
  })
);
