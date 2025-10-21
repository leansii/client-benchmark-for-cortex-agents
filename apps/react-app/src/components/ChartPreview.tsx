interface ChartPreviewProps {
  chartType: 'bar' | 'line' | 'table';
  description?: string;
}

export function ChartPreview({ chartType, description }: ChartPreviewProps) {
  return (
    <div className="chart-preview" role="img" aria-label={`Preview chart: ${chartType}`}>
      <span className="chart-preview__label">{chartType.toUpperCase()}</span>
      <p>{description ?? 'Chart rendering placeholder. Integrate charting library on implementation.'}</p>
    </div>
  );
}
