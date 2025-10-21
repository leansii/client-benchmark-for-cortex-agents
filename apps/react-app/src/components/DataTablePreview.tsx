import styles from './DataTablePreview.module.css';

interface DataTablePreviewProps {
  columns: string[];
  rows: Array<Record<string, unknown>>;
  emptyLabel?: string;
}

export function DataTablePreview({ columns, rows, emptyLabel = 'No data available' }: DataTablePreviewProps) {
  if (rows.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.container} role="table" aria-label="Tool data preview">
      <div className={styles.header} role="row">
        {columns.map((column) => (
          <span key={column} role="columnheader">
            {column}
          </span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div key={index} className={styles.row} role="row">
          {columns.map((column) => (
            <span key={column} role="cell">
              {String(row[column] ?? '')}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
