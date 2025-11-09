import { Icon, type IconNames } from '@/components/Icon';
import { Colors } from '@/plugins/data/colors';
import { toDate, toDateTime, toPrice, toTime } from '@/plugins/transformers';
import { css } from '@/utils';
import { Link } from 'react-router';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

type HeaderFormat = 'date' | 'time' | 'datetime' | 'price' | 'url' | 'image';
export type TableHeaderType<T> = { key: keyof T; label: string | null; format?: HeaderFormat };

type ActionType<T> = {
  icon: IconNames;
  onClick: (item: T) => void | Promise<void>;
  variant?: 'info' | 'warning' | 'success' | 'error';
};

type Props<T extends object> = {
  items: T[];
  headers: TableHeaderType<T>[];
  actions?: ActionType<T>[];
  actionsPosition?: 'start' | 'end';
  loading?: boolean;
};

const formatValue = (value: string | number, format?: HeaderFormat): string | null => {
  switch (format) {
    case 'price':
      return toPrice(value);
    case 'date':
      return typeof value === 'string' ? toDate(value) : String(value);
    case 'time':
      return typeof value === 'string' ? toTime(value) : String(value);
    case 'datetime':
      return typeof value === 'string' ? toDateTime(value) : String(value);
    default:
      return String(value);
  }
};

export function Table<T extends object>({ headers, items, actions, actionsPosition = 'end', loading }: Props<T>) {
  const handleActionClick = async (action: ActionType<T>, item: T) => {
    if (action && action.onClick) {
      await action.onClick(item);
    }
  };

  if (!headers.length) return null;
  if (loading) return <Spinner />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {actions && actionsPosition === 'start' && <th></th>}
          {headers.map(({ key, label }) => (
            <th key={String(key)}>{label ?? ''}</th>
          ))}
          {actions && actionsPosition === 'end' && <th></th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {actions && actionsPosition === 'start' && (
              <td style={{ borderRight: '1px solid #ccc' }}>
                <div className={styles.actionsContainer}>
                  {actions.map((action, actionIndex) => (
                    <span
                      key={actionIndex}
                      onClick={() => handleActionClick(action, item)}
                      className={css(styles.actionIconContainer)}
                      style={{ backgroundColor: Colors[`${action.variant || 'info'}Background`] }}>
                      <Icon name={action.icon} color={Colors[action.variant || 'info']} size={20} />
                    </span>
                  ))}
                </div>
              </td>
            )}
            {headers.map(({ key, format }, colIndex) => {
              const value = item[key];
              if (typeof value === 'boolean') {
                return (
                  <td key={colIndex}>
                    <Icon name={value ? 'circleCheck' : 'circleX'} size={20} color={value ? 'green' : 'red'} />
                  </td>
                );
              }
              if (typeof value === 'string' || typeof value === 'number') {
                return (
                  <td key={colIndex}>
                    {format === 'url' ? (
                      <Link target='_blank' to={value as string} />
                    ) : format === 'image' ? (
                      <img
                        src={value as string}
                        alt='item image'
                        style={{ maxWidth: '40px', maxHeight: '40px', aspectRatio: 1 }}
                        loading='lazy'
                      />
                    ) : (
                      <span>{formatValue(value, format) ?? ''}</span>
                    )}
                  </td>
                );
              }
              return <td key={colIndex}>-</td>;
            })}
            {actions && actionsPosition === 'end' && (
              <td style={{ borderLeft: '1px solid #ccc' }}>
                <div className={styles.actionsContainer}>
                  {actions.map((action, actionIndex) => (
                    <span
                      key={actionIndex}
                      onClick={() => handleActionClick(action, item)}
                      className={css(styles.actionIconContainer)}
                      style={{ backgroundColor: Colors[`${action.variant || 'info'}Background`] }}>
                      <Icon name={action.icon} color={Colors[action.variant || 'info']} size={20} />
                    </span>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
