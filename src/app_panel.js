import React from 'react';
import { Store } from './data/store';
import { PlayField } from './layout/play_field';
import { Map } from './component/map';
import { Details } from './component/details';
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
    const { map, focused } = state;

    const focus = (x, y) => dispatch({ type: 'FOCUS', value: { x, y } });
    const ifShowDetails = !(focused.x === -1 && focused.y === -1);
    return (
      <PlayField
        Menu={<div>Menu</div>}
        Players={<div>Players</div>}
        Map={<Map map={map} focused={focused} onFocus={(x, y) => focus(x, y)} />}
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
