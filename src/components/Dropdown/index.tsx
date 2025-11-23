import { css } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

type DropdownValue<T> = T | null | T[];

interface Props<T extends object> {
  label?: string;
  items: T[];
  value: DropdownValue<T>;
  onChange: (value: DropdownValue<T>) => void;
  keyName?: keyof T;
  labelName?: keyof T;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

export function Dropdown<T extends object>({
  label = 'Choose an option',
  items,
  value,
  onChange,
  keyName = 'value' as keyof T,
  labelName = 'label' as keyof T,
  disabled,
  required,
  clearable,
  multiple
}: Props<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isTouched, setIsTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedItems = value ?? [];

  const toggle = () => {
    if (disabled) {
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleChange = (item: T) => {
    if (disabled) {
      return;
    }
    if (!isTouched) {
      setIsTouched(true);
    }
    if (multiple) {
      const exists = (selectedItems as T[]).some((i) => i[keyName] === item[keyName]);
      const newSelection = exists
        ? (selectedItems as T[]).filter((i) => i[keyName] !== item[keyName])
        : [...(selectedItems as T[]), item];
      onChange(newSelection as DropdownValue<T>);
    } else {
      onChange(item as DropdownValue<T>);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTouched) {
      setIsTouched(true);
    }
    onChange(multiple ? [] : null);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const getDisplayLabel = () => {
    if (multiple) {
      return (selectedItems as T[]).length === 0
        ? label
        : (selectedItems as T[]).map((item) => item[labelName]).join(', ');
    }
    return ((selectedItems as T[]).length ? (selectedItems as T[])[0][labelName] : label) as string;
  };

  const hasError =
    isTouched && (multiple ? (selectedItems as T[]).length === 0 : !(selectedItems as T[])[0]) && required;

  return (
    <div ref={dropdownRef} className={styles.inputWrapper}>
      <div
        className={css(styles.container, isOpen ? styles.focused : '', hasError ? styles.error : '')}
        onClick={toggle}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}>
        <div className={styles.inputContainer}>
          <span className={styles.input}>{getDisplayLabel()}</span>
          <div className={styles.iconsContainer}>
            {!disabled && clearable && (selectedItems as T[]).length > 0 && (
              <div className={styles.icon} onClick={handleClear} tabIndex={0}>
                <Icon name='circleX' size={16} color='black' />
              </div>
            )}
            <div className={styles.icon}>
              <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} color='black' />
            </div>
          </div>
        </div>
        {(selectedItems as T[]).length > 0 && <span className={css(styles.label, styles.floating)}>{label}</span>}
        <div className={styles.dropdownContainer} onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <div className={styles.dropdownList}>
              {items.map((item, index) => {
                const isSelected = (selectedItems as T[]).some((i) => i[keyName] === item[keyName]);
                return (
                  <div
                    key={item[keyName] as string}
                    className={css(
                      styles.dropdownItem,
                      isSelected ? styles.selected : '',
                      index > 0 ? styles.borderTop : ''
                    )}
                    onClick={() => handleChange(item)}>
                    {multiple && (
                      <input type='checkbox' checked={isSelected} readOnly className={styles.checkbox} tabIndex={-1} />
                    )}
                    {item[labelName] as string}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <span className={styles.errorMessage}>{hasError ? 'This field is required' : ''}</span>
    </div>
  );
}
