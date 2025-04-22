import axios from "axios";
import api from "./apis";

interface StockDataResponse {
  [key: string]: any; // 具体类型可以根据返回数据结构进一步细化
}

const getDataByStockName = async (
  stockName: string,
  time: string
): Promise<StockDataResponse> => {
  try {
    const response = await api.get<StockDataResponse>("/time_series", {
      function: "TIME_SERIES_INTRADAY",
      symbol: stockName,
      interval: `${time}min`,
    });
    // const response = await axios.get<StockDataResponse>(url, {
    //   headers: { "User-Agent": "request" },
    // });

    return response;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

const getTopGainers = async () => {
  try {
    const response = await api.get<StockDataResponse>("/query", {
      function: "TOP_GAINERS_LOSERS",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { getDataByStockName, getTopGainers };
