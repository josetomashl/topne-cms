import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import type { UpdateReviewDto } from '@/dtos/Review';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestReview, updateReview } from '@/store/modules/reviews';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function EditReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.reviews);

  const [form, setForm] = useState<UpdateReviewDto>({
    title: '',
    content: '',
    isPublished: false
  });

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestReview(id));
    }
  }, [id, item]);
  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        content: item.content,
        isPublished: item.isPublished
      });
    }
  }, [item]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!id || !item) return;
    e.preventDefault();
    const res = await dispatch(updateReview({ id, payload: form })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Review actualizada con éxito.' }));
      navigate('/reviews');
    }
  };

  const disabled =
    loading || !form.title || !item || (item.title === form.title && (item.content || '') === (form.content || ''));

  return (
    <>
      <h3 className={styles.something}>
        Editar review "<b>{item?.title}</b>":
      </h3>
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
