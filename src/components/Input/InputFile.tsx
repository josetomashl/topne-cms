import { css } from '@/utils';
import { useEffect, useId, useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface Props {
  label?: string;
  value: File | null;
  onChange: (value: File | null, valid: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  accept?: string;
  showPreview?: boolean;
  maxSize?: number;
}

export function InputFile({
  label,
  value,
  onChange,
  disabled,
  required,
  clearable,
  errorMessage = 'Debe seleccionar un archivo.',
  accept = '*',
  showPreview = true,
  maxSize = MAX_FILE_SIZE
}: Props) {
  const id = useId();
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);

  // Validate file
  const checkValidity = (file: File | null) => {
    if (!file) {
      setSizeError(null);
      return !required;
    }

    if (file.size > maxSize) {
      setSizeError(`El archivo supera el tamaño máximo de ${(maxSize / (1024 * 1024)).toFixed(2)} MB`);
      return false;
    }

    setSizeError(null);
    return true;
  };

  useEffect(() => {
    setIsValid(checkValidity(value));

    if (value && showPreview) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleChange = (file: File | null) => {
    if (!disabled && onChange) {
      if (!isTouched) setIsTouched(true);
      onChange(file, checkValidity(file));
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div
        className={css(
          styles.container,
          isFocused ? styles.focused : '',
          (!isValid || sizeError) && isTouched ? styles.error : ''
        )}>
        <div className={styles.inputContainer}>
          <input
            id={id}
            type='file'
            accept={accept}
            disabled={disabled}
            style={{ display: 'none' }}
            onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div
            className={styles.input}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onClick={() => !disabled && document.getElementById(id)?.click()}>
            {value ? value.name : ''}
          </div>

          {clearable && value && (
            <div className={styles.iconContainer} onClick={() => handleChange(null)}>
              <Icon name='circleX' size={16} color='black' />
            </div>
          )}
        </div>

        {label && (
          <label htmlFor={id} className={css(styles.label, value || isFocused ? styles.floating : '')}>
            {label}
          </label>
        )}
      </div>

      <span className={styles.errorMessage}>{isTouched && (sizeError || (!isValid ? errorMessage : ''))}</span>

      {value && previewUrl && showPreview && (
        <div style={{ marginTop: 8 }}>
          {value.type.startsWith('image/') && (
            <img
              src={previewUrl}
              style={{ width: '240px', maxWidth: '100%', borderRadius: 6 }}
              loading='lazy'
              alt='pictograma'
            />
          )}
        </div>
      )}
    </div>
  );
}
