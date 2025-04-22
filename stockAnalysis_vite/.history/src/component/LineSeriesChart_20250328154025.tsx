import React, { useEffect, useRef } from "react";
import { createChart, HistogramSeries, LineSeries } from "lightweight-charts";
import dayjs from "dayjs";

interface SeriesData {
  time: string;
  value: number;
}

interface LineChartProps {
  lineData: SeriesData[];
  volumeData: SeriesData[];
}

const LineSeriesChart: React.FC<LineChartProps> = ({
  lineData,
  volumeData,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 建立圖表
    const chart = createChart(chartContainerRef.current, {
      width: 260,
      height: 120,
      layout: {
        background: { color: "#1E1E1E" },
        textColor: "#FFF",
      },
      grid: {
        vertLines: { color: "#2B2B2B" },
        horzLines: { color: "#2B2B2B" },
      },
    });

    // 建立價格線 Series
    const lineSeries = chart.addSeries(LineSeries);

    lineSeries.setData(lineData);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    volumeSeries.setData(volumeData);
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.background = "rgba(0, 0, 0, 0.7)";
    tooltip.style.color = "white";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time || param.seriesData.size === 0) {
        tooltip.style.display = "none";
        return;
      }

      param.seriesData.get(lineSeries);
      const price = (param.seriesData.get(lineSeries) as SeriesData)?.value;
      const volume = (param.seriesData.get(volumeSeries) as SeriesData)?.value;
      tooltip.innerHTML = `Time: ${param.time} <br> Price: ${price} <br> Volume: ${volume}`;
      tooltip.style.display = "block";
      tooltip.style.left = `${param.point?.x || 0 + 10}px`;
      tooltip.style.top = `${param.point?.y || 0 + 10}px`;
    });

    return () => {
      document.body.removeChild(tooltip);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default LineSeriesChart;
