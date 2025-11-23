import { Alert } from '@/components/Alert';
import { Dropdown } from '@/components/Dropdown';
import type { TagKV } from '@/dtos/Tag';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addTags } from '@/store/modules/pictograms';
import { pushNotification } from '@/store/modules/root';
import { requestAllTags } from '@/store/modules/tags';
import { type FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router';

interface Props {
  pictogramId: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function AddTagsForm({ pictogramId, onSuccess, onCancel }: Props) {
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state.pictograms);
  const { all, loading } = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(requestAllTags());
  }, []);

  const [tags, setTags] = useState<TagKV[]>([]);
  const handleChange = (value: TagKV | TagKV[] | null) => {
    if (Array.isArray(value)) {
      setTags(value);
    } else if (!value) {
      setTags([]);
    } else {
      setTags([value]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(addTags({ id: pictogramId, payload: { tagsId: tags.map((c) => c.id) } })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Etiqueta agregado con éxito.' }));
      if (onSuccess) {
        onSuccess();
      }
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const unusedTags = item ? all.filter((c) => ![...item.tags.map((cr) => cr.id)].includes(c.id)) : all;
  const disabled = !tags?.length || loading;

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ paddingBottom: 20 }}>Añadir etiquetas al pictograma:</h3>
      <Dropdown
        items={unusedTags}
        value={tags}
        onChange={handleChange}
        keyName='id'
        labelName='name'
        required
        label='Selecciona una o varias etiquetas'
        disabled={loading}
        clearable
        multiple
      />
      {!unusedTags ||
        (unusedTags.length === 0 && (
          <Alert type='error' hideClose>
            <p>No hay etiquetas disponibles para asignar.</p>
            <Link to='/tags/add' style={{ textDecoration: 'underline' }}>
              Crea nuevas aquí
            </Link>
          </Alert>
        ))}
      <Flex justifyContent='space-between' style={{ marginTop: 20 }}>
        {onCancel && (
          <button type='reset' onClick={handleCancel}>
            Cancelar
          </button>
        )}
        <button type='submit' disabled={disabled}>
          Actualizar
        </button>
      </Flex>
    </form>
  );
}
