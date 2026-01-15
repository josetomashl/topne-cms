import { type CSSProperties, useState } from 'react';

import styles from './styles.module.scss';

type Props = {
  url: string;
  alt?: string;
  lazy?: boolean;
  className?: string;
  style?: CSSProperties;
  serverImage?: boolean;
  onClick?: () => void;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export function Image({
  url,
  alt = 'Imagen',
  lazy = true,
  className,
  style,
  serverImage = false,
  onClick,
  fit = 'cover'
}: Props) {
  const [imgSrc, setImgSrc] = useState((serverImage ? import.meta.env.VITE_SERVER_API : '') + url);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImgSrc('/placeholder.webp');
  };

  return (
    <div className={`${styles.container} ${className || ''}`} style={style} onClick={onClick}>
      {isLoading && <div className={styles.skeleton} />}
      <img
        src={imgSrc}
        loading={lazy ? 'lazy' : 'eager'}
        alt={alt}
        crossOrigin={serverImage ? 'anonymous' : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${isLoading ? styles.loading : ''}`}
        style={{ objectFit: fit }}
      />
      {hasError && <div className={styles.error}>Imagen no disponible</div>}
    </div>
  );
}
