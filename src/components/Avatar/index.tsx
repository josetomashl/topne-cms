import { Colors } from '@/plugins/data/colors';
import { css } from '@/utils';
import { useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

type Props = {
  src: string | null;
  alt?: string;
  size?: number;
  className?: string;
};

export function Avatar({ src, alt = 'Profile image', size = 48, className = '' }: Props) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className={css(styles.avatar, className)} style={{ width: size, height: size }}>
      {src && !imgError ? (
        <img
          src={`${import.meta.env.VITE_SERVER_API}${src}`}
          alt={alt}
          width={size}
          height={size}
          className={styles.img}
          // onError={(e) => {
          //   console.log(`${import.meta.env.VITE_SERVER_API}${src}`);
          //   console.log(e);
          //   setImgError(true);
          // }}
          loading='lazy'
        />
      ) : (
        <Icon name='circleUser' size={size * 0.75} color={Colors.light} />
      )}
    </div>
  );
}
