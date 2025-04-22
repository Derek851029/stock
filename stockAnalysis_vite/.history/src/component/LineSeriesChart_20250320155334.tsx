import React, { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import dayjs from "dayjs";

interface ChartData {
  time: string;
  value: number;
}

const LineSeriesChart = () => {
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
      timeScale: {
        timeVisible: true, // 顯示時間（分鐘）
      },
    });

    // 建立價格線 Series
    const lineSeries = chart.addSeries(LineSeries);

    // 模擬 1 分鐘間隔的數據
    const priceData: ChartData[] = [];
    for (let i = 0; i < 30; i++) {
      const time = dayjs()
        .subtract(30 - i, "day")
        .format("YYYY-MM-DD");
      priceData.push({ time: time, value: 100 + Math.random() * 5 });
    }

    // priceData.sort(
    //   (a: ChartData, b: ChartData) =>
    //     dayjs(a.time).valueOf() - dayjs(b.time).valueOf()
    // );

    lineSeries.setData(priceData);

    // 模擬即時更新數據（每秒更新一次）
    const interval = setInterval(() => {
      const newTime = dayjs().add(1, "day").format("YYYY-MM-DD");
      const newPrice = 100 + Math.random() * 5;
      lineSeries.update({ time: newTime, value: newPrice });
    }, 60000); // 每 1 分鐘新增一個數據點

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default LineSeriesChart;
