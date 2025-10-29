import type { IconNames } from '@/components/Icon';
import type { To } from 'react-router';

type BaseNavItem = {
  label: string;
  icon: IconNames;
};
export type NavLinkItem = BaseNavItem & {
  path: To;
  children?: never; // no puede tener children si tiene path
};
export type NavGroupItem = BaseNavItem & {
  path?: never; // no puede tener path si tiene children
  children: NavLinkItem[]; // children no pueden tener children
};
type NavItem = NavLinkItem | NavGroupItem;

export const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: 'circleExclamation'
  },
  {
    label: 'Pictogramas',
    icon: 'circleCheck',
    children: [
      {
        label: 'Ver todos',
        path: '/pictograms',
        icon: 'circleX'
      },
      {
        label: 'Etiquetas',
        path: '/tags',
        icon: 'circleInfo'
      }
    ]
  },
  {
    label: 'Reviews',
    icon: 'circleCheck',
    children: [
      {
        label: 'Ver todos',
        path: '/reviews',
        icon: 'circleX'
      },
      {
        label: 'Categorías',
        path: '/categories',
        icon: 'circleInfo'
      }
    ]
  },
  {
    label: 'Usuarios',
    path: '/users',
    icon: 'circleX'
  }
];
