import React, { useState, useEffect } from 'react';
import { Store } from './data/store';
import { PlayField } from './layout/play_field';
import { Map } from './component/map';
import 'antd/dist/antd.css';

// import styles from './styles.modules.css';

export const AppPanel = React.memo(() => {
  return (
    <Store.Provider>
      <Store.Customer CMP={<App />} />
    </Store.Provider>
  );
});

const App = React.memo(({ state, dispatch }) => {
  const { map } = state;
  const [loc, setLoc] = useState([0, 0]);

  useEffect(() => {
    const move = (i, j) => {
      dispatch({ type: 'move', value: { i, j } });
    };
    move(loc[0], loc[1]);
  }, loc);

  return (
    <PlayField
      Menu={<div>Menu</div>}
      Players={<div>Players</div>}
      Map={<Map map={map} onTarget={(i, j) => setLoc([i, j])} />}
      // Details={() => <div>Details</div>}
    />
  );
});
