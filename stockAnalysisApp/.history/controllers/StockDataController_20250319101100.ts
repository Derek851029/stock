import { Request, Response } from "express";
import {getDataByStockName,getTopGainers} from "../services/stockService";

 const getSingleStockData = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.query.name as string;
    const time = req.query.time as string;
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
export default getSingleStockData
// export const getTopGainersData = async(req:Request,res:Response):Promise<void>=>{
//   try {
//     const data = await getTopGainers();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
