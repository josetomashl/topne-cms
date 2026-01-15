import { Alert } from '@/components/Alert';
import { Dropdown } from '@/components/Dropdown';
import type { CategoryKV } from '@/dtos/Category';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestAllCategories } from '@/store/modules/categories';
import { addCategories } from '@/store/modules/reviews';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router';

interface Props {
  reviewId: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function AddCategoriesForm({ reviewId, onSuccess, onCancel }: Props) {
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state.reviews);
  const { all, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(requestAllCategories());
  }, []);

  const [categories, setCategories] = useState<CategoryKV[]>([]);
  const handleChange = (value: CategoryKV | CategoryKV[] | null) => {
    if (Array.isArray(value)) {
      setCategories(value);
    } else if (!value) {
      setCategories([]);
    } else {
      setCategories([value]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(
      addCategories({ id: reviewId, payload: { categoriesId: categories.map((c) => c.id) } })
    ).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Categoría agregada con éxito.' }));
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

  const unusedCategories = item?.categories
    ? all.filter((c) => ![...item.categories!.map((cr) => cr.id)].includes(c.id))
    : all;
  const disabled = !categories?.length || loading;

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ paddingBottom: 20 }}>Añadir categorías a la review:</h3>
      <Dropdown
        items={unusedCategories}
        value={categories}
        onChange={handleChange}
        keyName='id'
        labelName='name'
        required
        label='Selecciona una o varias categorías'
        disabled={loading}
        clearable
        multiple
      />
      {!unusedCategories ||
        (unusedCategories.length === 0 && (
          <Alert type='error' hideClose>
            <p>No hay categorías disponibles para asignar.</p>
            <Link to='/categories/add' style={{ textDecoration: 'underline' }}>
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
