import type { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  justifyContent?: 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  flexDirection?: 'row' | 'column';
  gap?: number;
  style?: CSSProperties;
}
export const Flex = ({
  children,
  justifyContent = 'flex-start',
  alignItems = 'center',
  flexDirection = 'row',
  gap = 0,
  style
}: PropsWithChildren<Props>) => {
  return <div style={{ display: 'flex', justifyContent, alignItems, flexDirection, gap, ...style }}>{children}</div>;
};
