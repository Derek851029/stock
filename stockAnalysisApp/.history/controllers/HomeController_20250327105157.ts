import { Request, Response } from "express";
import { getIndices, getTopGainers } from "../services/homeService";

export async function getIndicesData(req: Request, res: Response) {
  try {
    const stockIndicesData = await getIndices();

    res.json(stockIndicesData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getTopGainersData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const topGainersData = await getTopGainers();
    res.json(topGainersData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
