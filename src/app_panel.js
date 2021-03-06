import React from 'react';
import { Store } from './data/store';
import { PlayField } from './layout/play_field';
import { Map } from './component/map';
import { Details } from './component/details';
import { Players } from './component/player';
import { Settings as Menu } from './component/menu';

import 'antd/dist/antd.css';

// import styles from './styles.modules.css';

export const AppPanel = React.memo(() => {
  return (
    <Store.Provider>
      <App />
    </Store.Provider>
  );
});

const App = Store.Customer(
  React.memo(props => {
    const { state, dispatch } = props;
    const { map, playerPos, focused } = state;

    console.log('state', state);
    const ifShowDetails = !(focused.x === -1 && focused.y === -1);
    const onNewGame = (x, y, playerNum) => {
      Store.Reset({ size: { x, y }, playerNum, dispatch });
      state.playerPos.forEach((pos, id) => {
        dispatch({ type: 'MOVE', value: { x: pos.x, y: pos.y, playerID: id } });
      });
    };

    const onFocus = (x, y) => dispatch({ type: 'FOCUS', value: { x, y } });
    const move = () =>
      dispatch({ type: 'MOVE', value: { x: focused.x, y: focused.y, playerID: 0 } });
    return (
      <PlayField
        Menu={<Menu onNewGame={onNewGame} />}
        Players={<Players players={state.players} />}
        Actions={
          <div>
            <button type="submit" onClick={move}>
              Move
            </button>
          </div>
        }
        Map={<Map map={map} playerPos={playerPos} focused={focused} onFocus={onFocus} />}
        Details={
          ifShowDetails && (
            <Details
              mapUnit={map[focused.x][focused.y]}
              onClose={() => dispatch({ type: 'FOCUS', value: { x: -1, y: -1 } })}
            />
          )
        }
      />
    );
  })
);
