import { Colors } from '@/plugins/data/colors';
import { useState, type PropsWithChildren } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

interface Props {
  type: 'info' | 'success' | 'warning' | 'error';
  hideClose?: boolean;
}

export const Alert = ({ type = 'info', hideClose, children }: PropsWithChildren<Props>) => {
  const [isHidden, setIsHidden] = useState(false);

  if (isHidden) {
    return null;
  }

  return (
    <div
      className={styles.container}
      style={{ borderColor: Colors[type], backgroundColor: Colors[`${type}Background`] }}>
      {!hideClose && (
        <span className={styles.closeBtn} role='button' onClick={() => setIsHidden(true)}>
          <Icon name='close' size={20} />
        </span>
      )}
      {children}
    </div>
  );
};
