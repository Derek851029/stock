# 股票 Side Project 待辦清單

## 一、專案初始化
- [x] 建立 Next.js 專案（使用 App Router）
- [x] 設定 TypeScript、ESLint、Prettier
- [x] 初始化 Express 後端（Node.js / Golang 擇一）
- [x] 設定資料夾結構與開發規範

## 二、驗證與授權
- [x] 使用 Cookie / JWT 實作登入驗證機制
- [x] Next.js middleware 實作權限檢查
- [ ] 後端 API 實作驗證中介層
- [ ] 登入、註冊、登出功能
- [ ] 前端登入狀態偵測與導向

## 三、股票功能模組
- [ ] 股票清單頁（支援分頁、篩選、搜尋）
- [ ] 單一股票詳情頁
  - [ ] 股價走勢圖（假資料）
  - [ ] 基本資訊、財報、技術指標等
- [ ] 投資組合管理
  - [ ] 新增、刪除股票到投資組合
  - [ ] 模擬持倉比例與成本計算
- [ ] 個股觀察清單功能
- [ ] 模擬買賣交易紀錄

## 四、資料處理與 API
- [ ] 後端建立假資料資料庫（可用 JSON 或 SQLite）
- [ ] API 路由設計（RESTful or RPC）
- [ ] 提供股票查詢、組合儲存等 API
- [ ] 整合 Chart Library 呈現數據（如 Chart.js、Recharts、Highcharts）

## 五、前端功能開發（React）
- [ ] 全站佈局（Header、側邊欄、主內容區）
- [ ] 使用 React Context 或 Zustand 管理全域狀態
- [ ] 加入 Loading、Error UI 處理
- [ ] 投資組合分析圖表視覺化

## 六、測試與優化
- [ ] 撰寫單元測試（Jest + React Testing Library）
- [ ] API 測試（Supertest / Postman）
- [ ] Lighthouse 性能測試與優化
- [ ] SSR / CSR 切換頁面測試

## 七、部署與 CI/CD
- [ ] 部署前後端到 Vercel / Railway / 自架伺服器
- [ ] 設定 CI/CD pipeline（GitHub Actions）
- [ ] 自動化部署測試與驗證

## 八、加值功能（進階）
- [ ] 匯出/匯入投資組合資料（CSV）
- [ ] 使用者偏好設定（幣別、語言）
- [ ] 股票即時模擬提醒系統（假資料推送）

## 九、文件與說明
- [ ] 撰寫 README.md（專案說明、架構圖、啟動方式）
- [ ] 記錄技術選型與開發筆記
