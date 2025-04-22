import { GetServerSideProps } from "next";
import api from "../../services/apis";
import Dashboard from "./dashboard";

interface TopGainersItem {
  code: string;
  name: string;
  price: number;
  change: number;
  percentage: number;
  volume: string;
  marketCap: string;
}

interface TopGainersData {
  data: TopGainersItem[];
}

interface StockIndices {
  id?: number;
  index_name?: string;
  timestamp?: string;
  price?: string;
  volume?: number;
  value?: number;
}

interface IndicesData {
  data: {
    "S&P 500": StockIndices[];
    NASDAQ: StockIndices[];
    "Dow Jones": StockIndices[];
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [topGainersRes, indicesRes] = await Promise.all([
    api.get<TopGainersData>("/dashboard/topGainers"),
    api.get<IndicesData>("/dashboard/indices"),
  ]);

  return {
    props: {
      topGainers: topGainersRes?.data || [],
      indices: indicesRes?.data || {
        "S&P 500": [],
        NASDAQ: [],
        "Dow Jones": [],
      },
    },
  };
};

export default Dashboard;
