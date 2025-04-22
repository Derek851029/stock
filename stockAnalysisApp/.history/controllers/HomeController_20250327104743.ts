import { Request, Response } from "express";
import { getTopGainers } from "../services/homeService";

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
