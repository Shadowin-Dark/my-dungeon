import React from 'react';
import { QqOutlined, WeiboOutlined } from '@ant-design/icons';

import { FieldList } from '../data/map/field_list';

import styles from './map.modules.css';
import fieldStyles from './field.modules.css';

const targetLocation = locations => {
  const locationMap = {};
  for (let i = 0; i < locations.length; i++) {
    locationMap[`${locations[i].x}:${locations[i].y}`] = i;
  }
  return locationMap;
};

const size = map => {
  const n = map.length;
  let m = 0;
  if (n > 0) {
    m = map[0].length;
  }
  return [n, m];
};

export const Map = React.memo(({ map, playerLoc, focused, onFocus }) => {
  console.log('Rendering Map');

  const playerLocMap = targetLocation(playerLoc);
  const [, m] = size(map);
  return (
    <ul className={styles.boxFw} style={{ width: `${m * 135 + 100}px` }}>
      {map.map((row, i) => {
        return row.map((mapUnit, j) => {
          return (
            <MapUnit
              key={mapUnit.keyID}
              className={i === focused.x && j === focused.y ? styles.focused : ''}
              style={{ marginLeft: j === 0 && i % 2 === 0 ? '70px' : '2px' }}
              mapUnit={mapUnit}
              userID={playerLocMap[`${i}:${j}`] !== undefined ? playerLocMap[`${i}:${j}`] : -1}
              onClick={() => onFocus(i, j)}
            />
          );
        });
      })}
    </ul>
  );
});

const MapUnit = React.memo(({ mapUnit, userID, className, ...options }) => {
  console.log('rendering map unit');
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
