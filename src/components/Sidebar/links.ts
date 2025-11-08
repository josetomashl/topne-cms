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
    label: 'Inicio',
    path: '/',
    icon: 'house'
  },
  {
    label: 'Pictogramas',
    icon: 'image',
    children: [
      {
        label: 'Ver todos',
        path: '/pictograms',
        icon: 'list'
      },
      {
        label: 'Etiquetas',
        path: '/tags',
        icon: 'tag'
      }
    ]
  },
  {
    label: 'Reviews',
    icon: 'video',
    children: [
      {
        label: 'Ver todos',
        path: '/reviews',
        icon: 'list'
      },
      {
        label: 'Categorías',
        path: '/categories',
        icon: 'tag'
      }
    ]
  },
  {
    label: 'Usuarios',
    path: '/users',
    icon: 'users'
  }
];
