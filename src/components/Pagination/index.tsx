import { Icon } from '@/components/Icon';
import styles from './styles.module.scss';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: Props) {
  const totalPages = Math.ceil(total / pageSize);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const handlePageChange = (p: number) => {
    onPageChange(p);
  };
  const handlePageSizeChange = (p: number) => {
    onPageSizeChange(p);
  };

  const handlePrev = () => handlePageChange(Math.max(page - 1, 0));
  const handleNext = () => handlePageChange(Math.min(page + 1, totalPages - 1));

  return (
    <div className={styles.paginationContainer}>
      <span>{total} entries</span>
      <div>
        <button onClick={() => handlePageChange(0)} disabled={!canPrev} aria-label='First page'>
          <Icon name='chevronsLeft' size={14} />
        </button>
        <button onClick={handlePrev} disabled={!canPrev} aria-label='Previous page'>
          <Icon name='chevronLeft' size={14} />
        </button>
        <span className='tbl-page-info'>
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNext} aria-label='Next page'>
          <Icon name='chevronRight' size={14} />
        </button>
        <button onClick={() => handlePageChange(totalPages - 1)} disabled={!canNext} aria-label='Last page'>
          <Icon name='chevronsRight' size={14} />
        </button>
      </div>
      <div>
        <label>
          <span>Rows: </span>
          <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
    </div>
  );
}
