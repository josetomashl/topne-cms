import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Input } from '@/components/Input';
import type { UpdateTagDto } from '@/dtos/Tag';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { requestTag, updateTag } from '@/store/modules/tags';
import styles from './styles.module.scss';

export function EditTagPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.tags);

  const [form, setForm] = useState<UpdateTagDto>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestTag(id));
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
      updateTag({ id, payload: { name: form.name.trim(), description: form.description?.trim() } })
    ).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Etiqueta actualizada con éxito.' }));
      navigate('/tags');
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
        Editar etiqueta "<b>{item?.name}</b>":
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
