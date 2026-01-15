import { useCallback } from 'react';

import { Image } from '@/components/Image';
import type { PictogramItem } from '@/dtos/Pictogram';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

interface Props {
  pictogram: PictogramItem;
}

export function PictogramCard({ pictogram }: Props) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/pictograms/${pictogram.id}`);
  }, [navigate, pictogram.id]);

  if (!pictogram) {
    return null;
  }

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      <Image url={pictogram.url} alt={pictogram.title} serverImage />
      <div className={styles.placeholder}>{pictogram.title}</div>
    </div>
  );
}
