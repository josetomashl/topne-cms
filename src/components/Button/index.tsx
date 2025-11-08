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
  type?: 'button' | 'submit' | 'reset';
  rounded?: boolean;
  className?: string;
  loading?: boolean;
};

export function Button({
  title = '',
  icon,
  iconPosition = 'left',
  iconColor,
  onClick,
  disabled = false,
  type = 'button',
  rounded = false,
  className,
  loading
}: Props) {
  const handleClick = async () => {
    if (disabled || loading || !onClick) return;
    await onClick();
  };

  if (icon && !title) {
    return (
      <button
        onClick={handleClick}
        type={type}
        className={css(
          styles.button,
          styles.iconButton,
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : <Icon name={icon} color={iconColor} />}
      </button>
    );
  } else if (icon && title) {
    return (
      <button
        onClick={handleClick}
        type={type}
        className={css(
          styles.button,
          styles.iconTextButton,
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
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
        type={type}
        className={css(
          styles.button,
          className || '',
          rounded ? styles.rounded : '',
          loading ? styles.loading : '',
          disabled ? styles.disabled : ''
        )}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : title}
      </button>
    );
  }
}
