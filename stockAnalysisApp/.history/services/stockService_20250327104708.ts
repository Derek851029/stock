import axios from "axios";
import api from "./apis";

interface StockDataResponse {
  [key: string]: any;
}

interface ResponseValues {
  time?: string;
  datetime?: string;
  open: string | number;
  high: string | number;
  low: string | number;
  close: string | number;
  volume: string | number;
}

interface TopGainersData {
  code: string;
  name: string;
  price: number;
  change: number;
  percentage: number;
  volume: string;
  marketCap: string;
}

interface TopGainersResponse {
  data: TopGainersData[];
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
      item.open = parseFloat(item.open as string);
      item.high = parseFloat(item.high as string);
      item.low = parseFloat(item.low as string);
      item.close = parseFloat(item.close as string);
      item.volume = parseInt(item.volume as string);
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

export { getDataByStockName };
