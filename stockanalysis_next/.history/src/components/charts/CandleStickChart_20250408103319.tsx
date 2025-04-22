import {
  CandlestickSeries,
  createChart,
  CrosshairMode,
  HistogramSeries,
  LineStyle,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { ChartItem } from "../../app/components/Dashboard";

interface ChartProps {
  chartData: ChartItem[];
  handleCandleStickHover: (data: ChartItem) => void;
  width: number;
}

const CandleStickChart: React.FC<ChartProps> = ({
  chartData,
  handleCandleStickHover,
  width,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: width || 600,
      height: 400,
      crosshair: { mode: CrosshairMode.Magnet },
    });
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#2196F3",
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    candlestickSeries.createPriceLine({
      price: 100,
      color: "#FF0000",
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
    });

    const data: ChartItem[] = chartData;

    candlestickSeries.setData(data);
    volumeSeries.setData(
      data.map(({ time, volume }) => ({ time, value: volume }))
    );

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      const candlestickData = param.seriesData.get(
        candlestickSeries
      ) as ChartItem;
      const volumeSeriesData = param.seriesData.get(volumeSeries) as ChartItem;

      console.log(candlestickData);
      candlestickData.volume = volumeSeriesData.value || 0;
      handleCandleStickHover(candlestickData);
    });
    return () => chart.remove();
  }, [chartData]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default CandleStickChart;
