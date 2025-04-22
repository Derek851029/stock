import { Request, Response } from "express";
import { getIndices, getTopGainers } from "../services/dashboardService";

export async function getIndicesData(req: Request, res: Response) {
  try {
    const data = await getIndices();

    res.json({ message: "Success", data });
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
}

export const getTopGainersData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getTopGainers();
    res.json({ message: "Success", data });
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};
