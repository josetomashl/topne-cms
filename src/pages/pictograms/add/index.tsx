import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import type { CreatePictogramDto } from '@/dtos/Pictogram';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createPictogram } from '@/store/modules/pictograms';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function AddPictogramPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.pictograms);

  const [form, setForm] = useState<CreatePictogramDto>({
    title: '',
    description: '',
    isPublished: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createPictogram(form)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Pictograma creado con éxito.' }));
      navigate('/pictograms');
    }
  };

  return (
    <>
      <p className={styles.something}>Nuevo pictograma</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Título'
          value={form.title}
          onChange={(val) => setForm({ ...form, title: val })}
          disabled={loading}
          required
        />
        <Input
          label='Descripción'
          value={form.description || ''}
          onChange={(val) => setForm({ ...form, description: val })}
          disabled={loading}
        />
        <Switch
          value={form.isPublished}
          onChange={(val) => setForm({ ...form, isPublished: val })}
          disabled={loading}
          label='¿Público?'
        />
        <button type='reset' onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <button type='submit' disabled={loading}>
          Crear
        </button>
      </form>
    </>
  );
}
