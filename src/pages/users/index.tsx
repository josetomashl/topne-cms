import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import type { UserList } from '@/dtos/User';
import { useAuth } from '@/hooks/useAuth';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteUser, requestUsers, setPage, setPageSize } from '@/store/modules/users';
import { UpdateUserPassword } from '@/views/users/UpdateUserPassword';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function UsersPage() {
  const { me } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, page, pageSize, loading, total } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(requestUsers({ page, pageSize }));
  }, [page, pageSize]);

  const [isDeleting, setIsDeleting] = useState<UserList>();
  const handleDelete = async () => {
    if (!isDeleting) return;
    await dispatch(deleteUser(isDeleting.id));
    setIsDeleting(undefined);
  };

  const [isEditingPassword, setIsEditingPassword] = useState<UserList>();

  return (
    <>
      <div className={styles.header}>
        <h3>Usuarios</h3>
        <Button title='Añadir' onClick={() => navigate('/users/add')} />
      </div>
      <Table
        items={list}
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'surname', label: 'Apellidos' },
          { key: 'email', label: 'Email' },
          { key: 'isActive', label: 'Activado' }
        ]}
        actions={[
          {
            icon: 'eye',
            variant: 'success',
            onClick: (item) => navigate(`/users/${item.id}`)
          },
          {
            icon: 'pencil',
            variant: 'warning',
            onClick: (item) => navigate(`/users/${item.id}/edit`)
          },
          {
            icon: 'asterisk',
            variant: 'warning',
            onClick: setIsEditingPassword
          },
          { icon: 'trash', variant: 'error', onClick: setIsDeleting, disableIf: (i) => i.id === me?.id }
        ]}
        loading={loading}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={(p) => dispatch(setPage(p))}
        onPageSizeChange={(p) => dispatch(setPageSize(p))}
      />
      {isDeleting && (
        <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(undefined)}>
          <h3>
            Borrar usuario "<b>{isDeleting.name + ' ' + isDeleting.surname}</b>"
          </h3>
          <Flex gap={10} justifyContent='space-between' style={{ marginTop: '20px' }}>
            <Button title='Cancelar' onClick={() => setIsDeleting(undefined)} />
            <Button title='Borrar' color={Colors.error} loading={loading} onClick={handleDelete} />
          </Flex>
        </Modal>
      )}
      {isEditingPassword && (
        <Modal isOpen={!!isEditingPassword} onClose={() => setIsEditingPassword(undefined)}>
          <UpdateUserPassword
            userId={isEditingPassword.id}
            userEmail={isEditingPassword.email}
            onCancel={() => setIsEditingPassword(undefined)}
            onSuccess={() => setIsEditingPassword(undefined)}
          />
        </Modal>
      )}
    </>
  );
}
