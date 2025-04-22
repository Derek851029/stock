import getDataByStockName from "../services/GetData";

export const StockDataController = async (req, res) => {
  const { name, time } = req.query;
  const data = await getDataByStockName(name, time);

  const timeKey = `Time Series (${time}min)`;
  res.json(data[timeKey]);
};
