import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import type { UpdatePictogramDto } from '@/dtos/Pictogram';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestPictogram, updatePictogram } from '@/store/modules/pictograms';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function EditPictogramPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.pictograms);

  const [form, setForm] = useState<UpdatePictogramDto>({
    title: '',
    description: '',
    isPublished: false
  });

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestPictogram(id));
    }
  }, [id, item]);
  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        description: item.description || '',
        isPublished: item.isPublished
      });
    }
  }, [item]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!id || !item) return;
    e.preventDefault();
    const res = await dispatch(updatePictogram({ id, payload: form })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Pictograma actualizado con éxito.' }));
      navigate('/pictograms');
    }
  };

  const disabled =
    loading ||
    !form.title ||
    !item ||
    (item.title === form.title && (item.description || '') === (form.description || ''));

  return (
    <>
      <h3 className={styles.something}>
        Editar etiqueta "<b>{item?.title}</b>":
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
          label='Descripción (recomendado)'
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
