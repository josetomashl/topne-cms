import { Icon, type IconNames } from '@/components/Icon';
import { Colors } from '@/plugins/data/colors';
import { toDate, toDateTime, toPrice, toTime } from '@/plugins/transformers';
import { Button } from '../Button';
import styles from './styles.module.scss';

// export type TableItemType = Record<string, string | number | boolean | null | undefined>;
type HeaderFormat = 'date' | 'time' | 'datetime' | 'price';
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
  if (loading) return <p>Cargando...</p>;

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
              <td style={{ borderRight: '1px solid #ccc', padding: '0.5rem' }}>
                {actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    icon={action.icon}
                    onClick={() => handleActionClick(action, item)}
                    rounded
                    iconColor={Colors[action.variant || 'info']}
                  />
                ))}
              </td>
            )}
            {headers.map(({ key, format }, colIndex) => {
              const value = item[key];
              if (typeof value === 'boolean') {
                return (
                  <td key={colIndex}>
                    <Icon name={value ? 'circleCheck' : 'circleX'} size={16} color={value ? 'green' : 'red'} />
                  </td>
                );
              }
              if (typeof value === 'string' || typeof value === 'number') {
                return (
                  <td key={colIndex}>
                    <span>{formatValue(value, format) ?? '-'}</span>
                  </td>
                );
              }
              return <td key={colIndex}>-</td>;
            })}
            {actions && actionsPosition === 'end' && (
              <td style={{ borderLeft: '1px solid #ccc', padding: '0.5rem' }}>
                {actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    icon={action.icon}
                    onClick={() => handleActionClick(action, item)}
                    rounded
                    iconColor={Colors[action.variant || 'info']}
                  />
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
