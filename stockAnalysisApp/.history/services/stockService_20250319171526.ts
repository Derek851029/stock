import axios from "axios";
import api from "./apis";

interface StockDataResponse {
  [key: string]: any; // 具体类型可以根据返回数据结构进一步细化
}

const getDataByStockName = async (
  symbol: string,
  time: string
): Promise<StockDataResponse> => {
  try {
    const response = await api.get<StockDataResponse>("/time_series", {
      function: "TIME_SERIES_INTRADAY",
      symbol: symbol,
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
    return stockData;
  } catch (error) {
    throw error;
  }
};

export { getDataByStockName, getTopGainers };
