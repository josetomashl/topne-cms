import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUsers } from '@/store/modules/users';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export function UsersPage() {
  const dispatch = useAppDispatch();
  const { list, pagination, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(requestUsers(pagination));
  }, [pagination.page, pagination.pageSize]);

  return (
    <>
      <p className={styles.something}>Users page</p>
      <pre>
        <code>{JSON.stringify(list, null, 2)}</code>
      </pre>
      <Table
        items={list}
        headers={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' }
        ]}
        actions={[
          {
            icon: 'chevronDown',
            onClick: (userClicked) => {
              console.log(userClicked);
            }
          }
        ]}
        loading={loading}
      />
    </>
  );
}
