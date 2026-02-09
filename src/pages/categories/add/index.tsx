import { Input } from '@/components/Input';
import type { CreateCategoryDto } from '@/dtos/Category';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createCategory } from '@/store/modules/categories';
import { pushNotification } from '@/store/modules/root';
import { type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function AddCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.categories);

  const [form, setForm] = useState<CreateCategoryDto>({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await dispatch(
      createCategory({ name: form.name.trim(), description: form.description?.trim() })
    ).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Categoría creada con éxito.' }));
      navigate(`/categories/${res.id}`);
    }
  };

  return (
    <>
      <p className={styles.something}>Nueva categoría</p>
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
        />
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          <button type='reset' onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type='submit' disabled={loading || !form.name}>
            Crear
          </button>
        </Flex>
      </form>
    </>
  );
}
