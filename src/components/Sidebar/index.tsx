import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { css } from '@/utils';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router';
import { Button } from '../Button';
import { navItems, type NavLinkItem } from './links';
import styles from './styles.module.scss';

const SidebarItem = ({ item }: { item: NavLinkItem }) => {
  return (
    <NavLink to={item.path} className={({ isActive }) => css(isActive ? styles.active : '', styles.sidebarLink)}>
      <Icon name={item.icon} color='white' />
      <span>{item.label}</span>
    </NavLink>
  );
};

export const Sidebar = () => {
  const { logout } = useAuth();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  }, []);

  const handleLogOut = useCallback(() => {
    logout();
  }, []);

  return (
    <div className={styles.sidebar}>
      <div>
        <div>
          <img src='/images/titulo-amarillo.webp' alt='Topne logo' className={styles.logo} loading='lazy' />
        </div>
        {navItems.map((item, index) => {
          if (item.path) {
            return <SidebarItem key={index} item={item} />;
          } else if (item.children?.length) {
            const isOpen = openGroups[item.label];

            return (
              <div key={index}>
                <div className={styles.sidebarGroupHead} onClick={() => toggleGroup(item.label)}>
                  <div className={css(styles.sidebarLink, styles.inner)}>
                    <Icon name={item.icon} color='white' />
                    <span>{item.label}</span>
                  </div>
                  <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={18} color='white' />
                </div>
                <div className={css(styles.sidebarChildren, isOpen ? styles.open : '')}>
                  {item.children.map((child, childIndex) => (
                    <SidebarItem key={'child-' + childIndex} item={child} />
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
      <Button
        title='Cerrar sesión'
        onClick={handleLogOut}
        iconPosition='left'
        icon='doorOpen'
        iconColor='white'
        className={styles.logoutBtn}
      />
    </div>
  );
};
