import React, { useCallback } from 'react';
import { QqOutlined, WeiboOutlined } from '@ant-design/icons';

import { Store } from '../data/store';
import { FieldList } from '../data/map/field_list';

import styles from './map.modules.css';
import fieldStyles from './field.modules.css';

const targetPosition = positions => {
  const positionMap = {};
  for (let i = 0; i < positions.length; i++) {
    positionMap[`${positions[i].x}:${positions[i].y}`] = i;
  }
  return positionMap;
};

const size = map => {
  const n = map.length;
  let m = 0;
  if (n > 0) {
    m = map[0].length;
  }
  return [n, m];
};

export const Map = Store.Customer(
  React.memo(({ state, dispatch }) => {
    console.log('Rendering Map');

    const { map, playerPos, focused } = state;

    const onFocus = useCallback((x, y) => {
      dispatch({ type: 'FOCUS', value: { x, y } });
    }, []);

    const playerPosMap = targetPosition(playerPos);
    const [, m] = size(map);
    return (
      <ul className={styles.boxFw} style={{ width: `${m * 135 + 100}px` }}>
        {map.map((row, i) => {
          return row.map((mapUnit, j) => {
            const userID = playerPosMap[`${i}:${j}`] !== undefined ? playerPosMap[`${i}:${j}`] : -1;
            const className = i === focused.x && j === focused.y ? styles.focused : '';
            return (
              <MapUnit
                key={mapUnit.keyID}
                className={`${
                  j === 0 && i % 2 === 0 ? styles.rowHeadEven : styles.rowHeadOdd
                } ${className}`}
                hide={mapUnit.hide}
                fieldID={mapUnit.fieldID}
                monsterID={mapUnit.monsterID}
                userID={userID}
                onClick={onFocus}
                posX={i}
                posY={j}
              />
            );
          });
        })}
      </ul>
    );
  })
);

const MapUnit = React.memo(props => {
  console.log('Rendering MapUnit');
  const { className, hide, fieldID, userID, monsterID, onClick, posX, posY, ...options } = props;
  if (hide) {
    return (
      // eslint-disable-next-line
      <li
        {...options}
        className={`${className} ${fieldStyles.field0}`}
        onClick={() => onClick(posX, posY)}
      >
        <div>?</div>
      </li>
    );
  }

  const field = FieldList[fieldID];
  return (
    // eslint-disable-next-line
    <li
      {...options}
      className={`${className} ${fieldStyles[`field${field.id}`]}`}
      onClick={() => onClick(posX, posY)}
    >
      <div>{`${field.name}`}</div>
      {monsterID && (
        <div>
          <WeiboOutlined />
        </div>
      )}
      {userID >= 0 && (
        <div>
          <QqOutlined />
        </div>
      )}
    </li>
  );
});
