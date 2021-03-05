import React from 'react';
import { QqOutlined, WeiboOutlined } from '@ant-design/icons';

import { FieldList } from '../data/map/field_list';

import styles from './map.modules.css';
import fieldStyles from './field.modules.css';

export const Map = React.memo(({ map, focused, onFocus }) => {
  const n = map.length;
  let m = 0;
  if (n > 0) {
    m = map[0].length;
  }
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
              onClick={() => onFocus(i, j)}
            />
          );
        });
      })}
    </ul>
  );
});

const MapUnit = React.memo(({ mapUnit, className, ...options }) => {
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
      {mapUnit.user && (
        <div>
          <QqOutlined />
        </div>
      )}
    </li>
  );
});
