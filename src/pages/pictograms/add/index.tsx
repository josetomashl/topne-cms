import { Input } from '@/components/Input';
import { InputFile, MAX_FILE_SIZE } from '@/components/Input/InputFile';
import { Switch } from '@/components/Switch';
import type { CreatePictogramDto } from '@/dtos/Pictogram';
import { Flex } from '@/layouts/Flex';
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

  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<CreatePictogramDto>({
    title: '',
    description: '',
    isPublished: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('isPublished', String(form.isPublished));
    if (file) {
      formData.append('file', file);
    }

    const res = await dispatch(createPictogram(formData)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Pictograma creado con éxito.' }));
      navigate(`/pictograms/${res.id}`);
    }
  };

  const disabled = !form.title || !file || (file && file?.size > MAX_FILE_SIZE);

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
          value={form.description}
          onChange={(val) => setForm({ ...form, description: val })}
          disabled={loading}
          required
        />
        <InputFile
          label='Pictograma (imagen en formato PNG, JPG o WEBP)'
          value={file}
          onChange={(f) => {
            console.log(f);
            setFile(f);
          }}
          disabled={loading}
          required
          clearable
          accept='.png,.webp,.jpeg,.jpg'
          showPreview
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
