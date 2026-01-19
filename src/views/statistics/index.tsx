import { useEffect } from 'react';
import { Link } from 'react-router';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestStatisticsSummary } from '@/store/modules/statistics';
import styles from './styles.module.scss';

export function Statistics() {
  const dispatch = useAppDispatch();
  const { loading, ...data } = useAppSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(requestStatisticsSummary());
  }, []);

  if (loading) {
    return <Spinner size={48} />;
  }

  return (
    <Flex gap={10} alignItems='stretch' style={{ width: '100%' }}>
      <Flex flexDirection='column' alignItems='stretch' gap={10} style={{ width: '100%' }}>
        <section className={styles.card}>
          <h3>Categorías más usadas:</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data?.topCategories}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='total' name='Total' fill={Colors.primary} minPointSize={5} />
              <Bar dataKey='published' name='Publicados' fill={Colors.secondary} minPointSize={5} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className={styles.card}>
          <h3>Reviews pendientes de publicación:</h3>
          <div>
            {data?.unpublishedReviews?.length ? (
              data.unpublishedReviews.map((r) => (
                <Flex key={r.id} alignItems='center' justifyContent='space-between' gap={10} className={styles.rowItem}>
                  {r.title}
                  <Link to={`/reviews/${r.id}`}>
                    <Icon name='eye' color={Colors.success} />
                  </Link>
                </Flex>
              ))
            ) : (
              <p>- No hay reviews pendientes de publicación.</p>
            )}
          </div>
        </section>
      </Flex>
      <Flex flexDirection='column' alignItems='stretch' gap={10} style={{ width: '100%' }}>
        <section className={styles.card}>
          <h3>Etiquetas más usadas:</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data?.topTags}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='total' name='Total' fill={Colors.primary} minPointSize={5} />
              <Bar dataKey='published' name='Publicados' fill={Colors.secondary} minPointSize={5} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className={styles.card}>
          <h3>Pictogramas pendientes de publicación:</h3>
          <div>
            {data?.unpublishedPictograms?.length ? (
              data.unpublishedPictograms.map((p) => (
                <Flex key={p.id} alignItems='center' justifyContent='space-between' gap={10} className={styles.rowItem}>
                  {p.title}
                  <Link to={`/pictograms/${p.id}`}>
                    <Icon name='eye' color={Colors.success} />
                  </Link>
                </Flex>
              ))
            ) : (
              <p>- No hay pictogramas pendientes de publicación.</p>
            )}
          </div>
        </section>
      </Flex>
    </Flex>
  );
}
