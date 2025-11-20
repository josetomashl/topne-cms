import { css } from '@/utils';
import { useEffect, useId, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  label?: string;
  value: string;
  onChange: (value: string, valid: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
}

export function Textarea({
  label,
  value,
  onChange,
  disabled,
  required,
  errorMessage = 'Este campo es requerido.'
}: Props) {
  const id = useId();
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(checkValidity(value));
  }, [value]);

  const handleChange = (v: string) => {
    if (!disabled && onChange) {
      if (!isTouched) {
        setIsTouched(true);
      }
      onChange(v, checkValidity(v));
    }
  };

  const checkValidity = (v: string) => {
    if (!v && required) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div
        className={css(styles.container, isFocused ? styles.focused : '', !isValid && isTouched ? styles.error : '')}>
        <div className={styles.inputContainer}>
          <textarea
            id={id}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete='off'
            rows={10}
          />
        </div>
        {label && (
          <label htmlFor={id} className={css(styles.label, !!value || isFocused ? styles.floating : '')}>
            {label}
          </label>
        )}
      </div>
      <span className={styles.errorMessage}>{isTouched && !isValid ? errorMessage : ''}</span>
    </div>
  );
}
