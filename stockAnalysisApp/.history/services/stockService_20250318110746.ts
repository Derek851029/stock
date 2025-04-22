import axios from "axios";

interface StockDataResponse {
  [key: string]: any; // 具体类型可以根据返回数据结构进一步细化
}

const getDataByStockName = async (
  stockName: string,
  time: string
): Promise<StockDataResponse | null> => {
  try {
    const key = process.env.APIKEY;
    if (!key) throw new Error("API key is missing");

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=${time}min&apikey=${key}`;
    
    const response = await axios.get<StockDataResponse>(url, {
      headers: { "User-Agent": "request" },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

export default getDataByStockName;
