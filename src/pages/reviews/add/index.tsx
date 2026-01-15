import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import { Textarea } from '@/components/Textarea';
import type { CreateReviewDto } from '@/dtos/Review';
import { Flex } from '@/layouts/Flex';
import { REGEX } from '@/plugins/data/regex';
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
    isPublished: false,
    url: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createReview(form)).unwrap();
    console.log(res);

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Review creada con éxito.' }));
      navigate(`/reviews/${res.id}`);
    }
  };

  const disabled = !form.title || !form.url || !form.content;

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
          label='Enlace al vídeo'
          type='url'
          value={form.url}
          onChange={(val) => setForm({ ...form, url: val })}
          disabled={loading}
          regExp={REGEX.url}
          required
        />
        <Textarea
          label='Contenido'
          value={form.content}
          onChange={(val) => setForm({ ...form, content: val })}
          disabled={loading}
          required
        />
        <Switch
          value={form.isPublished}
          onChange={(val) => setForm({ ...form, isPublished: val })}
          disabled={loading}
          label='¿Público?'
        />
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          <button type='reset' onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type='submit' disabled={loading || disabled}>
            Crear
          </button>
        </Flex>
      </form>
    </>
  );
}
