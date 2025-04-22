import { Request, Response } from "express";
import getDataByStockName from "../services/stockService";

export const getSingleStockData = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.query.name as string;
    const time = req.query.time as string;

    if (!name || !time) {
      res.status(400).json({ error: "Missing stock name or time interval" });
      return;
    }

    const data = await getDataByStockName(name, time);

    if (!data) {
      res.status(500).json({ error: "Failed to fetch stock data" });
      return;
    }

    const timeKey = `Time Series (${time}min)`;

    res.json(data[timeKey]);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTopGainers = async(req:Request,res:Response):Promise<void>=>{

}
