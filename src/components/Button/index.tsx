import { Colors } from '@/plugins/data/colors';
import { css } from '@/utils';
import { Icon, type IconNames } from '../Icon';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

type Props = {
  title?: string;
  icon?: IconNames;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  rounded?: boolean;
  className?: string;
  loading?: boolean;
  color?: string;
  textColor?: string;
};

export function Button({
  title = '',
  icon,
  iconPosition = 'left',
  iconColor,
  onClick,
  disabled = false,
  rounded = false,
  className,
  loading,
  color = Colors.dark,
  textColor = '#fff'
}: Props) {
  const handleClick = async () => {
    if (disabled || loading || !onClick) return;
    await onClick();
  };

  if (icon && !title) {
    return (
      <button
        onClick={handleClick}
        className={css(
          styles.iconButton,
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
        style={{ backgroundColor: color, color: textColor }}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : <Icon name={icon} color={iconColor} />}
      </button>
    );
  } else if (icon && title) {
    return (
      <button
        onClick={handleClick}
        className={css(
          styles.iconTextButton,
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
        style={{ backgroundColor: color, color: textColor }}
        disabled={disabled || loading}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {iconPosition === 'left' && <Icon name={icon} color={iconColor} />}
            {title}
            {iconPosition === 'right' && <Icon name={icon} color={iconColor} />}
          </>
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className={css(
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
        style={{ backgroundColor: color, color: textColor }}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : title}
      </button>
    );
  }
}
