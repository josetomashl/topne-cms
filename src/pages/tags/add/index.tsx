import { Input } from '@/components/Input';
import type { CreateTagDto } from '@/dtos/Tag';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { createTag } from '@/store/modules/tags';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function AddTagPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tags);

  const [form, setForm] = useState<CreateTagDto>({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createTag(form)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Etiqueta creada con éxito.' }));
      navigate('/tags');
    }
  };

  return (
    <>
      <p className={styles.something}>Create tag page</p>
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
        <button type='reset'>Cancelar</button>
        <button type='submit' disabled={loading || !form.name}>
          Crear
        </button>
      </form>
    </>
  );
}
