/*
  # 冰箱救星 - 食材管理系統

  1. 新增資料表
    - `ingredients` (食材表)
      - `id` (uuid, primary key) - 唯一識別碼
      - `name` (text, not null) - 食材名稱（如：雞蛋、牛奶、高麗菜）
      - `purchase_date` (date, not null) - 購買日期
      - `created_at` (timestamptz) - 建立時間戳記

  2. 安全性設定
    - 啟用 RLS（Row Level Security）
    - 允許所有使用者讀取食材資料
    - 允許所有使用者新增食材資料
    - 允許所有使用者刪除食材資料

  3. 重要說明
    - 此應用為個人食材管理工具
    - 過期判斷邏輯：購買日期 7 天內為新鮮、7-10 天為快過期、10 天以上為過期
*/

CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  purchase_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ingredients"
  ON ingredients
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add ingredients"
  ON ingredients
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete ingredients"
  ON ingredients
  FOR DELETE
  USING (true);