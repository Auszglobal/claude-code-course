# 模塊 9.6：Claude Code SDK 與 Agent SDK

## 🎯 學習目標
- 理解 Claude Code SDK 與 Agent SDK 的差異與各自用途
- 學會判斷何時該用 CLI、何時該用 SDK、何時該用 Agent SDK
- 能使用 Python Anthropic SDK 發送簡單的 API 訊息
- 能使用 Node.js SDK 建立一個帶有 Tool Use 的自訂 Agent
- 了解 Managed Agents（託管代理）的概念與遠端觸發方式

---

## 📖 理論解釋

### SDK 是什麼？

想像你去一間五金店買工具。你可以一件一件地挑選螺絲起子、扳手、電鑽，但如果店家把常用工具打包成一個「工具箱」賣給你，那就方便多了——打開就能用，不用自己組裝。

**SDK（Software Development Kit，軟體開發工具箱）** 就是這樣的概念。Anthropic 把所有跟 Claude 溝通需要的功能，打包成一個工具箱，讓程式設計師可以在自己的程式裡直接使用 Claude 的「大腦」。

### 三種使用 Claude 的方式

| 方式 | 比喻 | 適合場景 |
|------|------|----------|
| **CLI（命令列）** | 直接跟 Claude 對話的對講機 | 個人開發、即時互動、手動操作 |
| **SDK（軟體開發工具箱）** | 把 Claude 的腦袋裝進你的程式裡 | 建立自動化應用、聊天機器人、批次處理 |
| **Agent SDK（代理工具箱）** | 讓 Claude 變成一個自主行動的助手 | 複雜任務、多步驟流程、需要使用工具的場景 |

### Claude Code SDK vs Agent SDK

```
Claude Code SDK（基礎工具箱）
├── 發送訊息給 Claude，收到回覆
├── 設定模型參數（溫度、最大 token 數等）
├── 處理串流回應（一個字一個字地收到回覆）
└── 適合：簡單的問答、文字生成、內容分析

Agent SDK（進階代理工具箱）
├── 建立能「使用工具」的 Agent
├── Agent 可以自己決定下一步做什麼
├── 支援多輪對話與記憶
├── 可遠端部署為 Managed Agent（託管代理）
└── 適合：自動化工作流程、程式碼審查、資料處理
```

### 什麼是 Managed Agents（託管代理）？

想像你雇了一個遠端助理。你不需要每天在旁邊盯著他，只要設定好任務規則，他就會自己按時完成工作，有問題才會通知你。

**Managed Agents** 就是這個概念——你寫好一個 Agent，部署到雲端，然後它可以：
- 被 API 呼叫觸發（例如收到客戶訊息時自動回覆）
- 按照排程執行（例如每天早上自動生成報告）
- 被其他系統整合（例如 Slack 機器人、網站後端）

### 何時該用哪一個？（決策指南）

```
你想做什麼？
│
├─ 只是想在終端機跟 Claude 對話？
│  → 用 CLI（命令列），直接輸入 claude 即可
│
├─ 想在自己的程式裡呼叫 Claude？
│  │
│  ├─ 只需要簡單的問答或文字生成？
│  │  → 用 SDK（anthropic 套件）
│  │
│  └─ 需要 Claude 自主決策、使用工具、多步驟執行？
│     → 用 Agent SDK
│
└─ 想讓 Agent 在雲端自動運行？
   → 用 Managed Agents（託管代理）
```

---

## 💻 代碼示例 1：用 Python SDK 發送簡單訊息

這是最基礎的用法——用 Python 程式呼叫 Claude API，就像發一條訊息給 Claude 一樣。

### 安裝 SDK

```bash
# 在終端機中執行以下指令安裝 Python SDK
pip install anthropic
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────┐
│ Successfully installed anthropic-0.52.0  │
└──────────────────────────────────────────┘
```

### Python 程式碼

```python
# 檔案名稱：simple_chat.py
# 功能：用 Anthropic SDK 發送一條訊息給 Claude，並顯示回覆

# 第 1 步：匯入 Anthropic SDK
import anthropic

# 第 2 步：建立客戶端（Client）
# SDK 會自動讀取環境變數 ANTHROPIC_API_KEY
# 所以你需要先設定好你的 API 金鑰
client = anthropic.Anthropic()

# 第 3 步：發送訊息給 Claude
message = client.messages.create(
    model="claude-sonnet-4-6",          # 使用的模型（Sonnet 性價比最高）
    max_tokens=1024,                     # 回覆最多 1024 個 token
    messages=[                           # 對話訊息列表
        {
            "role": "user",              # 角色：使用者
            "content": "請用一句話解釋什麼是 API，讓小學生也能聽懂。"
        }
    ]
)

# 第 4 步：顯示 Claude 的回覆
print("Claude 的回覆：")
print(message.content[0].text)          # 取出回覆的文字內容

# 第 5 步：顯示使用統計（花了多少 token）
print(f"\n--- 使用統計 ---")
print(f"輸入 token 數：{message.usage.input_tokens}")   # 你發送的訊息用了多少 token
print(f"輸出 token 數：{message.usage.output_tokens}")   # Claude 回覆用了多少 token
```

### 執行前準備

```bash
# 設定 API 金鑰（Windows PowerShell）
$env:ANTHROPIC_API_KEY = "sk-ant-api03-你的金鑰..."

# 設定 API 金鑰（Mac/Linux 終端機）
export ANTHROPIC_API_KEY="sk-ant-api03-你的金鑰..."

# 執行程式
python simple_chat.py
```

### 預期輸出：

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────┐
│ Claude 的回覆：                                       │
│ API 就像餐廳的服務生——你告訴服務生你要點什麼菜，      │
│ 服務生幫你去廚房拿，再端回來給你，你不需要自己進廚房。 │
│                                                      │
│ --- 使用統計 ---                                      │
│ 輸入 token 數：28                                     │
│ 輸出 token 數：65                                     │
└──────────────────────────────────────────────────────┘
```

---

## 💻 代碼示例 2：用 Node.js SDK 建立帶有 Tool Use 的自訂 Agent

這個進階示例展示如何讓 Claude 不只是回答問題，還能「使用工具」——例如查詢天氣、計算數字等。就像給 Claude 一把瑞士刀，讓它自己決定什麼時候該用哪個功能。

### 安裝 Node.js SDK

```bash
# 建立一個新的專案資料夾
mkdir my-agent && cd my-agent

# 初始化 Node.js 專案
npm init -y

# 安裝 Anthropic Node.js SDK
npm install @anthropic-ai/sdk
```

### Node.js 程式碼

```javascript
// 檔案名稱：smart_agent.mjs
// 功能：建立一個能使用「計算機」和「翻譯」工具的 Claude Agent

// 第 1 步：匯入 Anthropic SDK
import Anthropic from "@anthropic-ai/sdk";

// 第 2 步：建立客戶端
// 跟 Python 一樣，會自動讀取環境變數 ANTHROPIC_API_KEY
const client = new Anthropic();

// 第 3 步：定義 Claude 可以使用的「工具」
// 這些工具就像 Claude 手邊的道具，它會自己判斷何時使用
const tools = [
  {
    name: "calculator",                            // 工具名稱：計算機
    description: "執行數學計算，支援加減乘除和次方", // 工具說明
    input_schema: {                                // 輸入格式定義
      type: "object",
      properties: {
        expression: {                              // 需要一個 expression 參數
          type: "string",
          description: "要計算的數學表達式，例如 '15 * 24 + 100'"
        }
      },
      required: ["expression"]                     // expression 是必填的
    }
  },
  {
    name: "word_counter",                          // 工具名稱：字數計算器
    description: "計算一段文字的字數和字元數",       // 工具說明
    input_schema: {
      type: "object",
      properties: {
        text: {                                    // 需要一個 text 參數
          type: "string",
          description: "要計算字數的文字內容"
        }
      },
      required: ["text"]
    }
  }
];

// 第 4 步：定義工具的實際執行邏輯
// 當 Claude 決定使用某個工具時，這個函式會被呼叫
function executeTool(toolName, toolInput) {
  if (toolName === "calculator") {
    try {
      // 使用 Function 建構函式安全地計算數學表達式
      const result = new Function(`return ${toolInput.expression}`)();
      return `計算結果：${toolInput.expression} = ${result}`;
    } catch (error) {
      return `計算錯誤：${error.message}`;
    }
  }

  if (toolName === "word_counter") {
    // 計算字數（以空格分隔）和字元數
    const words = toolInput.text.trim().split(/\s+/).length;
    const chars = toolInput.text.length;
    return `字數：${words}，字元數：${chars}`;
  }

  return "未知的工具";
}

// 第 5 步：主要的 Agent 迴圈
// Agent 會不斷跟 Claude 對話，直到 Claude 不再需要使用工具
async function runAgent(userQuestion) {
  console.log(`\n🧑 使用者問題：${userQuestion}\n`);

  // 初始化對話訊息
  let messages = [
    { role: "user", content: userQuestion }
  ];

  // Agent 迴圈：持續處理直到 Claude 給出最終回覆
  while (true) {
    // 發送訊息給 Claude，並告訴它有哪些工具可用
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",                  // 使用 Sonnet 模型
      max_tokens: 1024,                            // 最大回覆長度
      tools: tools,                                // 傳入可用的工具列表
      messages: messages                           // 傳入完整對話歷史
    });

    // 檢查 Claude 的回覆類型
    if (response.stop_reason === "tool_use") {
      // Claude 決定要使用工具！
      // 找到工具使用的請求
      const toolUseBlock = response.content.find(
        block => block.type === "tool_use"
      );

      console.log(`🔧 Claude 想使用工具：${toolUseBlock.name}`);
      console.log(`   輸入參數：${JSON.stringify(toolUseBlock.input)}`);

      // 執行工具並取得結果
      const toolResult = executeTool(toolUseBlock.name, toolUseBlock.input);
      console.log(`   工具結果：${toolResult}\n`);

      // 把 Claude 的回覆和工具結果加入對話歷史
      messages.push({ role: "assistant", content: response.content });
      messages.push({
        role: "user",
        content: [{
          type: "tool_result",                     // 告訴 Claude 這是工具結果
          tool_use_id: toolUseBlock.id,            // 對應的工具呼叫 ID
          content: toolResult                       // 工具執行的結果
        }]
      });
      // 繼續迴圈，讓 Claude 處理工具結果

    } else {
      // Claude 給出了最終回覆（不需要再使用工具）
      const textBlock = response.content.find(
        block => block.type === "text"
      );
      console.log(`🤖 Claude 最終回覆：\n${textBlock.text}`);
      break;  // 結束 Agent 迴圈
    }
  }
}

// 第 6 步：執行 Agent
// 問一個需要使用計算機工具的問題
runAgent("如果一間教室有 35 個學生，每個學生需要 3 本課本，每本課本 45 元，總共要花多少錢？");
```

### 執行程式

```bash
# 設定 API 金鑰（如果還沒設定的話）
export ANTHROPIC_API_KEY="sk-ant-api03-你的金鑰..."

# 執行 Agent
node smart_agent.mjs
```

### 預期輸出：

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────────────┐
│ 🧑 使用者問題：如果一間教室有 35 個學生，每個學生需要      │
│    3 本課本，每本課本 45 元，總共要花多少錢？              │
│                                                            │
│ 🔧 Claude 想使用工具：calculator                           │
│    輸入參數：{"expression":"35 * 3 * 45"}                  │
│    工具結果：計算結果：35 * 3 * 45 = 4725                  │
│                                                            │
│ 🤖 Claude 最終回覆：                                       │
│ 總共需要花 **4,725 元**。                                   │
│                                                            │
│ 計算方式：                                                  │
│ - 35 個學生 × 3 本課本 = 105 本課本                        │
│ - 105 本課本 × 45 元 = 4,725 元                            │
└────────────────────────────────────────────────────────────┘
```

---

## 💻 補充：Managed Agents 實戰概念

Managed Agents 是 Anthropic 提供的雲端代理服務。你可以把寫好的 Agent 部署到 Anthropic 的平台上，讓它像一個「雲端員工」一樣隨時待命。

### 常見應用場景

```
場景 1：智慧客服機器人
┌──────────────────────────────────────┐
│ 客戶發訊息 → 觸發 Managed Agent     │
│ Agent 查詢知識庫 → 生成回覆         │
│ 自動回覆客戶                         │
│ 無法解答 → 轉接真人客服             │
└──────────────────────────────────────┘

場景 2：自動程式碼審查員
┌──────────────────────────────────────┐
│ 開發者提交 Pull Request              │
│ → 觸發 Managed Agent                │
│ Agent 閱讀程式碼差異                 │
│ → 檢查風格、邏輯、安全性            │
│ → 自動留下審查意見                   │
└──────────────────────────────────────┘

場景 3：每日資料處理器
┌──────────────────────────────────────┐
│ 每天早上 9:00 排程觸發              │
│ → Agent 讀取昨天的銷售資料          │
│ → 計算統計數據                       │
│ → 生成摘要報告                       │
│ → 發送 email 給管理層               │
└──────────────────────────────────────┘
```

### 可用的模型選擇

| 模型 | 用途 | 特點 |
|------|------|------|
| `claude-opus-4-6` | 最高品質推理 | 最聰明、最貴，適合複雜任務 |
| `claude-sonnet-4-6` | 平衡性能與成本 | 日常開發首選，性價比最高 |
| `claude-haiku-4-5-20251001` | 高速低成本 | 適合大量簡單任務、即時回應 |

---

## ✍️ 動手練習

### 練習 1：修改 Python 範例

嘗試修改 `simple_chat.py`，讓它可以進行多輪對話（像聊天一樣來回對話）。

**提示：**
- 用一個 `while True` 迴圈不斷接收使用者輸入
- 把每一輪的對話都加入 `messages` 列表中
- 當使用者輸入 "bye" 時結束對話
- 記得把 Claude 的回覆也加入 `messages`（role 設為 "assistant"）

```python
# 提示框架（嘗試填完它）：
messages = []
while True:
    user_input = input("你：")
    if user_input.lower() == "bye":
        break
    messages.append({"role": "user", "content": user_input})
    # ... 呼叫 API，取得回覆 ...
    # ... 把回覆加入 messages ...
    # ... 顯示回覆 ...
```

### 練習 2：為 Node.js Agent 新增一個工具

嘗試為 `smart_agent.mjs` 新增一個 `current_time` 工具，讓 Claude 可以查詢目前的時間。

**提示：**
- 在 `tools` 陣列中新增工具定義（不需要任何輸入參數）
- 在 `executeTool` 函式中新增處理邏輯
- 使用 `new Date().toLocaleString("zh-TW")` 取得中文格式的時間
- 測試問題：「現在幾點了？」

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. SDK 和 CLI 最大的差別是什麼？</p>
<label><input type="radio" name="q1" value="0"> SDK 比較慢，CLI 比較快</label>
<label><input type="radio" name="q1" value="1"> SDK 讓你在自己的程式裡呼叫 Claude，CLI 是直接在終端機互動</label>
<label><input type="radio" name="q1" value="2"> SDK 只能用 Python，CLI 可以用任何語言</label>
<label><input type="radio" name="q1" value="3"> SDK 是免費的，CLI 需要付費</label>
<div class="quiz-explain">CLI（命令列）是你直接在終端機跟 Claude 對話的方式，而 SDK 是一個程式庫，讓你在自己寫的 Python 或 Node.js 程式裡呼叫 Claude 的功能。簡單來說，CLI 是「你對 Claude 說話」，SDK 是「你的程式對 Claude 說話」。</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. 在 Tool Use 的流程中，當 Claude 決定使用某個工具時，實際執行工具的是誰？</p>
<label><input type="radio" name="q2" value="0"> Claude 自己在雲端執行工具</label>
<label><input type="radio" name="q2" value="1"> Anthropic 的伺服器執行工具</label>
<label><input type="radio" name="q2" value="2"> 你的程式碼負責執行工具，然後把結果回傳給 Claude</label>
<label><input type="radio" name="q2" value="3"> 工具會自動執行，不需要任何人介入</label>
<div class="quiz-explain">這是 Tool Use 的核心概念。Claude 只負責「決定要用哪個工具」和「提供輸入參數」，但實際的工具執行是由你的程式碼完成的。你的程式收到 Claude 的工具請求後，執行對應的邏輯，再把結果回傳給 Claude，讓它根據結果生成最終回覆。</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. 以下哪個場景最適合使用 Managed Agents？</p>
<label><input type="radio" name="q3" value="0"> 我想在終端機裡快速問 Claude 一個問題</label>
<label><input type="radio" name="q3" value="1"> 我想建立一個 24 小時自動運行的客服機器人</label>
<label><input type="radio" name="q3" value="2"> 我想在自己的 Python 腳本裡生成一段文字</label>
<label><input type="radio" name="q3" value="3"> 我想讓 Claude 幫我寫一個簡單的函式</label>
<div class="quiz-explain">Managed Agents 的最大優勢是可以部署到雲端、24 小時待命、被外部事件觸發。自動客服機器人需要隨時回應客戶訊息，這正是 Managed Agents 的強項。其他選項用 CLI（A、D）或基礎 SDK（C）就能完成。</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. 在 Python SDK 中，<code>client.messages.create()</code> 的 <code>max_tokens</code> 參數有什麼作用？</p>
<label><input type="radio" name="q4" value="0"> 限制 Claude 回覆的最大長度（以 token 為單位）</label>
<label><input type="radio" name="q4" value="1"> 設定你的 API 每月使用上限</label>
<label><input type="radio" name="q4" value="2"> 限制你發送訊息的長度</label>
<label><input type="radio" name="q4" value="3"> 設定 Claude 的記憶容量</label>
<div class="quiz-explain"><code>max_tokens</code> 限制的是 Claude 回覆的最大 token 數量。例如設定 1024 就表示回覆最多 1024 個 token。這有助於控制成本和回覆長度，但不影響你發送的訊息長度。</div>
</div>

<div class="quiz-q" data-answer="2">
<p>5. 在 Node.js Agent 範例中，當 <code>response.stop_reason === "tool_use"</code> 時，程式應該怎麼做？</p>
<label><input type="radio" name="q5" value="0"> 直接顯示 Claude 的回覆然後結束程式</label>
<label><input type="radio" name="q5" value="1"> 重新發送使用者的原始問題</label>
<label><input type="radio" name="q5" value="2"> 執行 Claude 請求的工具，將結果回傳給 Claude，然後繼續對話迴圈</label>
<label><input type="radio" name="q5" value="3"> 切換到不同的 AI 模型</label>
<div class="quiz-explain">當 stop_reason 是 "tool_use" 時，表示 Claude 想使用一個工具。程式需要找到工具請求、執行對應的工具邏輯、將結果作為 tool_result 回傳給 Claude，然後繼續迴圈讓 Claude 處理結果。</div>
</div>

<div class="quiz-q" data-answer="3">
<p>6. 為什麼 SDK 會自動讀取環境變數 <code>ANTHROPIC_API_KEY</code> 而不是在程式碼中直接寫入金鑰？</p>
<label><input type="radio" name="q6" value="0"> 因為環境變數讓程式跑得更快</label>
<label><input type="radio" name="q6" value="1"> 因為 Python 不支援字串常數</label>
<label><input type="radio" name="q6" value="2"> 因為環境變數可以讓不同電腦使用不同的金鑰</label>
<label><input type="radio" name="q6" value="3"> 為了安全 — 避免金鑰被意外提交到 Git 並公開暴露</label>
<div class="quiz-explain">將 API 金鑰寫在程式碼中，一旦提交到 GitHub（即使是私有倉庫），金鑰就有暴露的風險。環境變數將敏感資訊與程式碼分離，是業界標準的安全做法。</div>
</div>

<div class="quiz-q" data-answer="1">
<p>7. 在 Tool Use 中，<code>input_schema</code> 的作用是什麼？</p>
<label><input type="radio" name="q7" value="0"> 定義工具的回傳值格式</label>
<label><input type="radio" name="q7" value="1"> 告訴 Claude 這個工具需要什麼輸入參數、類型和描述</label>
<label><input type="radio" name="q7" value="2"> 設定工具的執行速度</label>
<label><input type="radio" name="q7" value="3"> 限制哪些使用者可以使用這個工具</label>
<div class="quiz-explain"><code>input_schema</code> 使用 JSON Schema 格式定義工具的輸入參數，包括參數名稱、類型、描述和是否必填。Claude 根據這個定義來決定如何傳入正確的參數值。</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. Sonnet、Opus 和 Haiku 三個模型中，日常開發最推薦使用哪一個？</p>
<label><input type="radio" name="q8" value="0"> Sonnet — 性價比最高，適合大多數日常任務</label>
<label><input type="radio" name="q8" value="1"> Opus — 最強大，應該始終使用</label>
<label><input type="radio" name="q8" value="2"> Haiku — 最便宜，所有任務都應使用</label>
<label><input type="radio" name="q8" value="3"> 三個模型完全一樣，沒有差別</label>
<div class="quiz-explain">Sonnet 是平衡效能與成本的最佳選擇，適合日常開發的大多數任務。Opus 最強但最貴，適合複雜推理；Haiku 最快最便宜，適合簡單機械性任務。根據任務選擇合適的模型是控制成本的關鍵。</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

---

## 🔗 下一步

恭喜你完成了 Phase 9 的所有模塊！你已經學會了：
- Sub-agents 與多代理協作
- Plan Mode 策略性規劃
- 資料庫操作與管理
- Headless 模式與 CI/CD 整合
- Docker、Git Worktrees 與安全性
- SDK 與 Agent SDK 的使用

在接下來的課程中，我們將進入更進階的主題，學習如何將這些技能整合在一起，建立一個完整的 AI 自動化系統。你已經具備了所有基礎知識，接下來就是把它們組合起來，創造真正有用的東西！

> 💡 **學習建議**：回顧一下 Phase 9 的所有模塊，挑選一個最感興趣的主題，嘗試建立一個小型的實際專案。實踐是最好的學習方式！
