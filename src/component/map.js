import React from 'react';
import { QqOutlined, WeiboOutlined } from '@ant-design/icons';

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

export const Map = React.memo(({ map, playerPos, focused, onFocus }) => {
  console.log('Rendering Map');
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
              className={className}
              style={{ marginLeft: j === 0 && i % 2 === 0 ? '70px' : '2px' }}
              mapUnit={mapUnit}
              userID={userID}
              onClick={() => onFocus(i, j)}
            />
          );
        });
      })}
    </ul>
  );
});

const MapUnit = React.memo(({ mapUnit, userID, className, ...options }) => {
  if (mapUnit.hide) {
    return (
      <li {...options} className={`${className} ${fieldStyles.field0}`}>
        <div>?</div>
      </li>
    );
  }

  const field = FieldList[mapUnit.fieldID];
  return (
    <li {...options} className={`${className} ${fieldStyles[`field${field.id}`]}`}>
      <div>{`${field.name}`}</div>
      {mapUnit.monster && (
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
