import { type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { Input } from '@/components/Input';
import type { CreateTagDto } from '@/dtos/Tag';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { createTag } from '@/store/modules/tags';

export function AddTagPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tags);

  const [form, setForm] = useState<CreateTagDto>({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await dispatch(createTag({ name: form.name.trim(), description: form.description?.trim() })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Etiqueta creada con éxito.' }));
      navigate(`/tags/${res.id}`);
    }
  };

  return (
    <>
      <h3>Nueva etiqueta:</h3>
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
