import api from "../../services/apis";
import Dashboard from "../components/Dashboard";
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

interface IndicesItems {
  id?: number;
  index_name?: string;
  timestamp?: string;
  price?: string;
  volume?: number;
  value?: number;
}

interface IndicesData {
  data: {
    "S&P 500": IndicesItems[];
    NASDAQ: IndicesItems[];
    "Dow Jones": IndicesItems[];
  };
}

export default async function DashboardPage() {
  const [topGainersRes, indicesRes] = await Promise.all([
    api.get<TopGainersData>("/dashboard/topGainers"),
    api.get<IndicesData>("/dashboard/indices"),
  ]);

  return (
    <Dashboard
      topGainers={topGainersRes.data || []}
      indices={
        indicesRes.data || {
          "S&P 500": [],
          NASDAQ: [],
          "Dow Jones": [],
        }
      }
    />
  );
}
