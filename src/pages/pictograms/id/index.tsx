import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Spinner } from '@/components/Spinner';
import type { TagKV } from '@/dtos/Tag';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeTag, requestPictogram, updatePictogram } from '@/store/modules/pictograms';
import { pushNotification } from '@/store/modules/root';
import { AddTagsForm } from '@/views/pictograms/AddTagsForm';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.scss';

export function PictogramPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.pictograms);

  useEffect(() => {
    if (id) {
      dispatch(requestPictogram(id));
    }
  }, [id]);

  const handlePublish = useCallback(() => {
    if (item) {
      dispatch(
        updatePictogram({
          id: item.id,
          payload: { description: item.description, title: item.title, isPublished: true }
        })
      );
    }
  }, [item]);

  const [modalAddTag, setModalAddTag] = useState(false);
  const [modalRemoveTag, setModalRemoveTag] = useState<TagKV | null>(null);

  const handleDeleteTag = useCallback(async () => {
    if (!item || !modalRemoveTag) {
      return;
    }
    await dispatch(removeTag({ id: item?.id, tagId: modalRemoveTag.id }));
    dispatch(pushNotification({ type: 'warning', message: 'Etiqueta quitada.' }));
    setModalRemoveTag(null);
  }, [item, modalRemoveTag]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Pictograma no encontrado.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center' style={{ marginBottom: 10 }}>
        <h3>
          Pictograma "<b>{item.title}</b>":
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>
      {!item.isPublished && (
        <Alert type='warning'>
          Este pictograma no está publicado.
          <br />
          <Button title='Publicar' onClick={handlePublish} />
        </Alert>
      )}
      <Flex gap={10}>
        {item.tags.map((c) => (
          <span key={c.id} className={styles.category}>
            <Flex gap={8} alignItems='center'>
              <Icon name='tag' size={14} color={Colors.light} />
              {c.name}
            </Flex>
            <span onClick={() => setModalRemoveTag(c)} role='button'>
              <Icon name='circleX' size={14} color={Colors.error} />
            </span>
          </span>
        ))}
        <Button
          color={Colors.secondaryDark}
          title='Añadir etiqueta'
          icon='circlePlus'
          iconColor={Colors.light}
          onClick={() => setModalAddTag(true)}
        />
      </Flex>
      <div className={styles.descriptionContainer}>{item.description}</div>
      <Modal isOpen={modalAddTag} onClose={() => setModalAddTag(false)}>
        <AddTagsForm
          pictogramId={item.id}
          onCancel={() => setModalAddTag(false)}
          onSuccess={() => setModalAddTag(false)}
        />
      </Modal>
      <Modal isOpen={!!modalRemoveTag} onClose={() => setModalRemoveTag(null)}>
        <Flex flexDirection='column' alignItems='center' gap={20}>
          <h3>Vas a quitar la etiqueta "{modalRemoveTag?.name}".</h3>
          <p>¿Estas seguro?</p>
          <Button color={Colors.error} icon='trash' title='Borrar' onClick={handleDeleteTag} iconColor={Colors.light} />
        </Flex>
      </Modal>
    </>
  );
}
