import React from 'react';
import { FieldList } from '../data/map/field_list';

import styles from './details.modules.css';

export const Details = React.memo(({ mapUnit, onClose }) => {
  const { hide, fieldID } = mapUnit;
  const field = FieldList[fieldID];

  if (hide) {
    return (
      <div>
        <button className={styles.closeButton} onClick={onClose} type="button">
          x
        </button>
        <div className={styles.fieldTitle}>?</div>
      </div>
    );
  }
  return (
    <div>
      <button className={styles.closeButton} onClick={onClose} type="button">
        x
      </button>
      <div className={styles.fieldTitle}>{field.name}</div>
      <div className={styles.fieldDescription}>{field.description}</div>
    </div>
  );
});
