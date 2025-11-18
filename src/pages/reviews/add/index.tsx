import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import type { CreateReviewDto } from '@/dtos/Review';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createReview } from '@/store/modules/reviews';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function AddReviewPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.reviews);

  const [form, setForm] = useState<CreateReviewDto>({
    title: '',
    content: '',
    isPublished: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createReview(form)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Review creada con éxito.' }));
      navigate('/reviews');
    }
  };

  return (
    <>
      <p className={styles.something}>Nueva review</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Título'
          value={form.title}
          onChange={(val) => setForm({ ...form, title: val })}
          disabled={loading}
          required
        />
        <Input
          label='Contenido'
          value={form.content || ''}
          onChange={(val) => setForm({ ...form, content: val })}
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
