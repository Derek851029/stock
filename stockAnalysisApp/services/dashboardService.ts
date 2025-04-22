import { Dashboard } from "../src/models/Dashboard";

export async function getTopGainers() {
  const topGainers = Dashboard.selectTopGainers();

  if (!topGainers) throw new Error("Can't find Data");

  return topGainers;
}

export async function getIndices() {
  const stockIndices = await Dashboard.selectIndices();
  if (!stockIndices) throw new Error("Can't find Data");

  return stockIndices;
}
