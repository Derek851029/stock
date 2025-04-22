import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Home, Settings, ArrowUpIcon, HeartIcon } from "lucide-react";
import { useState } from "react";

// import LineSeriesChart from "../component/LineSeriesChart";
// import CandleStickChart from "../component/CandleStickChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "../../components/ui/table";
import dayjs from "dayjs";
import api from "../../services/apis";

export interface ChartItem {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  value?: number;
}

interface IndicesChartItem {
  time: string;
  value: number;
}

interface StockItem {
  meta: any;
  values: ChartItem[];
}

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
  "S&P 500": StockIndices[];
  NASDAQ: StockIndices[];
  "Dow Jones": StockIndices[];
}

interface DashboardProps {
  topGainers: TopGainersItem[];
  indices: IndicesData;
}

const Dashboard = ({ topGainers, indices }: DashboardProps) => {
  const [selectedMA, setSelectedMA] = useState<string>("日線");

  const [stockCode, setStockCode] = useState<string>("");

  const [chartData, setChartData] = useState<ChartItem[]>([]);

  const [candleStickHover, setCandleStickHover] = useState<ChartItem | null>(
    null
  );

  const getSingleData = async (symbol: string, Interval?: string) => {
    const data = await api.get<StockItem>("/stock/single", {
      symbol: symbol,
      Interval: Interval || "1day",
    });

    if (data?.values) {
      setChartData(
        data.values.sort(
          (a, b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf()
        )
      );
      setSelectedMA("日線");
    }
  };

  const handleCandleStickHover = (data: ChartItem) => {
    console.log(data);
    setCandleStickHover(data);
  };

  const calculateStockFluctuations = () => {
    const high = parseFloat(String(candleStickHover?.high));
    const low = parseFloat(String(candleStickHover?.low));
    const rangeIncrease = ((high - low) / low) * 100;

    return rangeIncrease ? rangeIncrease.toFixed(2) + "%" : "";
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* 左側導航欄 */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col space-y-4">
        <h1 className="text-xl font-bold">📊 股票分析</h1>
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost" className="flex items-center space-x-2">
            <Home size={18} />
            <span>首頁</span>
          </Button>
          {/* <Button variant="ghost" className="flex items-center space-x-2">
            <LineChart size={18} />
            <span>市場數據</span>
          </Button> */}
          <Button variant="ghost" className="flex items-center space-x-2">
            <Settings size={18} />
            <span>設定</span>
          </Button>
        </nav>
      </aside>

      {/* 主要內容區域 */}
      <main className="flex-1 p-6 space-y-4 overflow-auto">
        <div className="p-6">
          {/* 指數資訊區塊 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.keys(indices).map((indicesName) => {
              return (
                <Card
                  key={indicesName}
                  className="p-4 flex flex-col items-center"
                >
                  <div className="text-lg font-semibold">{indicesName}</div>
                  {/* <LineSeriesChart
                    lineData={indices[indicesName as keyof IndicesData].map(
                      (item) => ({
                        time: item.timestamp as string,
                        value: item.price ? parseFloat(item.price) : 0,
                      })
                    )}
                    volumeData={indices[indicesName as keyof IndicesData].map(
                      (item) => ({
                        time: item.timestamp as string,
                        value: item.volume || 0,
                      })
                    )}
                  /> */}
                  <div className="text-2xl font-bold flex items-center mt-2">
                    <ArrowUpIcon className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                  <div className="text-green-500">+123.45 (+1.23%)</div>
                </Card>
              );
            })}
          </div>

          {/* Tabs 切換 */}
          <Tabs defaultValue="all">
            <TabsList className="flex space-x-4 border-b">
              {["熱門", "自選", "全部", "行業板塊"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="cursor-pointer p-2 border-b-2 border-transparent hover:bg-gray-500"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <Table className="mt-4 text-left">
                <TableHeader>
                  <TableRow>
                    <TableHead>代碼</TableHead>
                    <TableHead>股票名稱</TableHead>
                    <TableHead>最新價</TableHead>
                    <TableHead>漲跌額</TableHead>
                    <TableHead>升跌幅</TableHead>
                    <TableHead>成交量</TableHead>
                    <TableHead>總市值</TableHead>
                    <TableHead>自選</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topGainers.map((stock) => (
                    <TableRow
                      key={stock.code}
                      className="cursor-pointer hover:bg-gray-500 transition duration-200"
                      onClick={() => {
                        getSingleData(stock.code);
                        setStockCode(stock.code);
                      }}
                    >
                      <TableCell className="font-medium">
                        {stock.code}
                      </TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>{stock.price}</TableCell>
                      <TableCell
                        className={`${
                          stock.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.change >= 0 ? `+${stock.change}` : stock.change}
                      </TableCell>
                      <TableCell
                        className={` ${
                          stock.percentage >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stock.percentage >= 0
                          ? `+${stock.percentage}%`
                          : `${stock.percentage}%`}
                      </TableCell>
                      <TableCell>{stock.volume}</TableCell>
                      <TableCell>{stock.marketCap}</TableCell>
                      <TableCell>
                        <HeartIcon className="w-8 h-8 p-1 rounded-full hover:bg-gray-700" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>

        {/* K 線圖 & 指標面板 */}
        <div className="grid grid-cols-4 gap-4">
          {/* K 線圖區域 */}
          <Card className="col-span-3">
            <CardContent className="h-full w-full flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="w-full h-full">
                {/* <CandleStickChart
                  chartData={chartData}
                  handleCandleStickHover={handleCandleStickHover}
                /> */}
              </div>
            </CardContent>
          </Card>

          {/* 指標面板 */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">📌 技術指標</h3>
              <div className="flex flex-col space-x-2 gap-5">
                {["日線", "周線", "月線"].map((ma) => (
                  <Button
                    key={ma}
                    variant={selectedMA === ma ? "default" : "outline"}
                    onClick={() => {
                      setSelectedMA(ma);
                      getSingleData(
                        stockCode,
                        ma === "日線"
                          ? "1day"
                          : ma === "周線"
                          ? "1week"
                          : "1month"
                      );
                    }}
                  >
                    {ma}
                  </Button>
                ))}
              </div>
              <p className="mt-2">當前選擇: {selectedMA}</p>
            </CardContent>
          </Card>
        </div>

        {/* 交易資訊區塊 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold">💰 交易資訊</h3>
            <p>成交量: {candleStickHover?.volume.toLocaleString()} 股</p>
            <p>最高成交價: {candleStickHover?.high.toFixed(2)}</p>
            <p>
              區間漲跌幅:
              {calculateStockFluctuations()}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
