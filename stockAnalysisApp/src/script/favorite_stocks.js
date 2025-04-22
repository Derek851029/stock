// CREATE TABLE favorite_stocks (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID NOT NULL,
//     symbol VARCHAR(10) NOT NULL, -- 股票代碼（如 AAPL、TSLA）
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     CONSTRAINT unique_user_stock UNIQUE (user_id, symbol) -- 確保同一用戶不能收藏相同的股票
//   );
