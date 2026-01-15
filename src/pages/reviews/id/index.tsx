import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Spinner } from '@/components/Spinner';
import type { CategoryKV } from '@/dtos/Category';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeCategory, requestReview, updateReviewVisibility } from '@/store/modules/reviews';
import { pushNotification } from '@/store/modules/root';
import { AddCategoriesForm } from '@/views/reviews/AddCategoriesForm';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import styles from './styles.module.scss';

export function ReviewPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(requestReview(id));
    }
  }, [id]);

  const handlePublish = useCallback(() => {
    if (item) {
      dispatch(updateReviewVisibility(item.id));
    }
  }, [item]);

  const [modalAddCategory, setModalAddCategory] = useState(false);
  const [modalRemoveCategory, setModalRemoveCategory] = useState<CategoryKV | null>(null);

  const handleDeleteCategory = useCallback(async () => {
    if (!item || !modalRemoveCategory) {
      return;
    }
    await dispatch(removeCategory({ id: item?.id, categoryId: modalRemoveCategory.id }));
    dispatch(pushNotification({ type: 'warning', message: 'Categoría quitada.' }));
    setModalRemoveCategory(null);
  }, [item, modalRemoveCategory]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Review no encontrada.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <h3>
          Review "<b>{item.title}</b>":
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>
      <Alert type={item.isPublished ? 'success' : 'warning'} hideClose>
        <Flex justifyContent='space-between'>
          <span>Estado: {item.isPublished ? 'Publicado' : 'No publicado'}</span>
          <Button
            title={item.isPublished ? 'Ocultar' : 'Publicar'}
            onClick={handlePublish}
            color={item.isPublished ? Colors.error : Colors.dark}
          />
        </Flex>
      </Alert>
      <Flex gap={10} style={{ marginTop: 10 }}>
        {item.categories?.map((c) => (
          <span key={c.id} className={styles.category}>
            <Flex gap={8} alignItems='center'>
              <Icon name='tag' size={14} color={Colors.light} />
              {c.name}
            </Flex>
            <span onClick={() => setModalRemoveCategory(c)} role='button'>
              <Icon name='circleX' size={14} color={Colors.error} />
            </span>
          </span>
        ))}
        <Button
          color={Colors.secondaryDark}
          title='Añadir categoría'
          icon='circlePlus'
          iconColor={Colors.light}
          onClick={() => setModalAddCategory(true)}
        />
      </Flex>
      <div className={styles.contentContainer}>{item.content}</div>
      <div className={styles.videoContainer}>
        <ReactPlayer src={item.url} fallback={<Spinner />} controls width={'100%'} height={'100%'} />
      </div>
      <Modal isOpen={modalAddCategory} onClose={() => setModalAddCategory(false)}>
        <AddCategoriesForm
          reviewId={item.id}
          onCancel={() => setModalAddCategory(false)}
          onSuccess={() => setModalAddCategory(false)}
        />
      </Modal>
      <Modal isOpen={!!modalRemoveCategory} onClose={() => setModalRemoveCategory(null)}>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap={20}>
          <h3 style={{ textAlign: 'center' }}>
            Vas a quitar la categoría "<b>{modalRemoveCategory?.name}</b>" de la review "<b>{item.title}</b>".
          </h3>
          <p>¿Estas seguro?</p>
          <Button
            color={Colors.error}
            icon='trash'
            title='Borrar'
            onClick={handleDeleteCategory}
            iconColor={Colors.light}
          />
        </Flex>
      </Modal>
    </>
  );
}
