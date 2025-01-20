import axios from "axios";

const getDataByStockName = async (stockName, time) => {
  const key = process.env.APIKEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=${time}min&apikey=${key}`;

  return axios
    .get(url, {
      headers: { "User-Agent": "request" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export default getDataByStockName;
