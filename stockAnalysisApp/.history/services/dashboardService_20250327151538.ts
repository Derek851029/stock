import { HomeModel } from "../src/models/Home";

export async function getTopGainers() {
  const topGainers = HomeModel.selectTopGainers();

  if (!topGainers) throw new Error("Can't find Data");

  return topGainers;
}

export async function getIndices() {
  const stockIndices = await HomeModel.selectIndices();
  if (!stockIndices) throw new Error("Can't find Data");

  return stockIndices;
}
