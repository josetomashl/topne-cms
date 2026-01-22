import { Input } from '@/components/Input';
import type { UpdateCategoryDto } from '@/dtos/Category';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestCategory, updateCategory } from '@/store/modules/categories';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.categories);

  const [form, setForm] = useState<UpdateCategoryDto>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestCategory(id));
    }
  }, [id, item]);
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        description: item.description || ''
      });
    }
  }, [item]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!id || !item) return;
    e.preventDefault();
    const res = await dispatch(
      updateCategory({ id, payload: { name: form.name.trim(), description: form.description?.trim() } })
    ).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Categoría actualizada con éxito.' }));
      navigate('/categories');
    }
  };

  const disabled =
    loading ||
    !form.name ||
    !item ||
    (item.name === form.name && (item.description || '') === (form.description || ''));

  return (
    <>
      <h3 className={styles.something}>
        Editar categoría "<b>{item?.name}</b>":
      </h3>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nombre'
          value={form.name}
          onChange={(val) => setForm({ ...form, name: val })}
          disabled={loading}
          required
        />
        <Input
          label='Descripción (opcional)'
          value={form.description || ''}
          onChange={(val) => setForm({ ...form, description: val })}
          disabled={loading}
          clearable
        />
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          <button type='reset' onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type='submit' disabled={disabled}>
            Actualizar
          </button>
        </Flex>
      </form>
    </>
  );
}
