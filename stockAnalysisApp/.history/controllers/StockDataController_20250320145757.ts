import { Request, Response } from "express";
import { getDataByStockName, getTopGainers } from "../services/stockService";

export const getSingleStockData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const symbol = req.query.symbol as string;
    const Interval = req.query.Interval as string;
    const data = await getDataByStockName(symbol, Interval);

    if (!data) {
      res.status(500).json({ error: "Failed to fetch stock data" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTopGainersData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getTopGainers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
