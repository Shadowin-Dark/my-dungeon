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
        return row.map((field, j) => {
          return (
            <Field
              key={field.keyID}
              className={i === focused.x && j === focused.y ? styles.focused : ''}
              style={{ marginLeft: j === 0 && i % 2 === 0 ? '70px' : '2px' }}
              field={field}
              onClick={() => onFocus(i, j)}
            />
          );
        });
      })}
    </ul>
  );
});

const Field = React.memo(({ field, className, ...options }) => {
  if (field.hide) {
    return (
      <li {...options} className={`${className} ${fieldStyles.field0}`}>
        <div>?</div>
      </li>
    );
  }

  const fieldMetadata = FieldList[field.id];
  return (
    <li {...options} className={`${className} ${fieldStyles[`field${field.id}`]}`}>
      <div>{`${fieldMetadata.name}`}</div>
      {field.monster && (
        <div>
          <WeiboOutlined />
        </div>
      )}
      {field.user && (
        <div>
          <QqOutlined />
        </div>
      )}
    </li>
  );
});
