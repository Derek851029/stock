import axios from "axios";
import api from "./apis";

interface StockDataResponse {
  [key: string]: any;
}

interface ResponseValues {
  time?: string;
  datetime?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const getDataByStockName = async (
  symbol: string,
  interval: string
): Promise<StockDataResponse> => {
  try {
    const response = await api.get<StockDataResponse>("/time_series", {
      symbol: symbol,
      interval: interval,
    });

    const values = response?.values.map((item: ResponseValues) => {
      item.time = item.datetime;
      delete item.datetime;
      return item;
    });

    response.values = values;

    return response;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

const getTopGainers = async () => {
  try {
    const symbols = [
      "AAPL",
      "MSFT",
      "TSLA",
      "NVDA",
      "GOOGL",
      "AMZN",
      "META",
      "NFLX",
      "BRK.B",
      "JPM",
    ];

    const stockData = await Promise.all(
      symbols.map((symbol) =>
        api.get<StockDataResponse>("/quote", {
          symbol: symbol,
        })
      )
    );
    return stockData.sort((a, b) => b.volume - a.volume);
  } catch (error) {
    throw error;
  }
};

export { getDataByStockName, getTopGainers };
