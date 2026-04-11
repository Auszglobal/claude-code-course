# 7.2 Google 生態系統整合

## 概覽

Google 的工具套件是很多團隊的日常核心。Claude Code 和 Cowork 都可以與 Google 深度整合：

| Google 服務 | Claude Code 方式 | Cowork 方式 |
|-------------|------------------|-------------|
| Google Sheets | `gspread` + 服務帳號 | Google Drive connector |
| Gmail | Gmail API + OAuth2 | Gmail connector |
| Google Drive | API 或 CLI | Drive connector |
| Google Calendar | API | Calendar connector |

## Google Sheets — 數據同步

### Claude Code 方式

使用 `gspread` Python 庫 + 服務帳號：

```python
import gspread
from google.oauth2.service_account import Credentials

# 認證
creds = Credentials.from_service_account_file(
    'google_credentials.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets']
)
gc = gspread.authorize(creds)

# 開啟試算表
sh = gc.open('AUSZ Bookings')
worksheet = sh.sheet1

# 讀取所有資料
data = worksheet.get_all_records()

# 寫入資料
worksheet.append_row(['2026-04-11', 'Sydney Airport', '$180'])
```

### 應用場景

- 自動同步訂單/預約到 Sheet
- 從 Sheet 讀取配置和參數
- 每月報表自動填入

## Gmail — 自動化郵件

### Claude Code 方式

使用 Gmail API + OAuth2：

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# 認證（需要 token.json）
creds = Credentials.from_authorized_user_file('token.json')
service = build('gmail', 'v1', credentials=creds)

# 發送郵件
message = create_message(
    sender='me',
    to='client@example.com',
    subject='預約確認',
    body='您的預約已確認...'
)
service.users().messages().send(userId='me', body=message).execute()
```

### Cowork 方式

直接在 Cowork 中：
```
連接 Gmail connector → "幫我回覆這封郵件，語氣保持專業"
```

### 應用場景

- 自動發送預約確認信
- 批量發送報表和發票
- 讀取郵件內容並分類處理

## Google Calendar

### Cowork 方式（最簡單）

1. 連接 Google Calendar connector
2. 讓 Cowork 讀取今天的行程
3. 結合每日晨間簡報工作流

### Claude Code 方式

透過 Google Calendar API 或 MCP server：

```bash
# 如果有 Google Calendar MCP server
# Claude Code 可以直接查詢和建立事件
```

## 安全注意事項

| 檔案 | 注意事項 |
|------|----------|
| `credentials.json` | OAuth2 客戶端密鑰 — **永不提交到 Git** |
| `token.json` | 用戶授權 token — **永不提交到 Git** |
| `google_credentials.json` | 服務帳號密鑰 — **永不提交到 Git** |

在 `.gitignore` 中加入：
```
credentials.json
token.json
google_credentials.json
```

---

## 練習

1. 設定 Google Sheets 整合，讓 Claude Code 讀取一個試算表
2. 用 Gmail API 發送一封測試郵件
3. 在 Cowork 中連接 Google Drive，比較兩種方式的便利性
