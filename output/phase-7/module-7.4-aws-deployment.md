# 7.4 AWS 與雲端部署

## 為什麼 AWS？

AWS 是最常用的雲端平台之一。Claude Code 可以直接使用 AWS CLI 管理你的雲端資源。

## AWS CLI 整合

Claude Code 天然支援 AWS CLI — 只要你的系統已配置好 `aws configure`：

```bash
# S3 — 靜態網站部署
aws s3 sync dist/ s3://my-website-bucket/ --delete

# Lightsail — 伺服器管理
aws lightsail get-instance --instance-name my-server

# DynamoDB — NoSQL 資料庫
aws dynamodb scan --table-name BookingRecords

# Lambda — 無伺服器函數
aws lambda invoke --function-name processBooking output.json
```

## 常見 AWS 工作流

### 1. 靜態網站部署（S3 + CloudFront）

```bash
# 建置前端
npm run build

# 同步到 S3
aws s3 sync dist/ s3://blog.example.com/ --delete

# 清除 CDN 快取（如果用 CloudFront）
aws cloudfront create-invalidation \
  --distribution-id E1234567 \
  --paths "/*"
```

### 2. 伺服器管理（Lightsail / EC2）

```bash
# SSH 到伺服器
ssh -i my-key.pem ubuntu@13.211.221.35

# 在遠端執行命令
ssh -i my-key.pem ubuntu@13.211.221.35 "sudo systemctl restart nginx"
```

Claude Code 可以幫你：
- 撰寫部署腳本
- 診斷伺服器問題
- 設定 CI/CD pipeline

### 3. DynamoDB（NoSQL 資料庫）

```python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DriverDeviceTokens')

# 讀取
response = table.get_item(Key={'driver_id': 'D001'})

# 寫入
table.put_item(Item={
    'driver_id': 'D001',
    'token': 'fcm_token_here',
    'platform': 'ios'
})
```

## 安全注意事項

| 風險 | 防護措施 |
|------|----------|
| AWS 密鑰洩漏 | 永不把 `~/.aws/credentials` 提交到 Git |
| S3 公開存取 | 確認 bucket policy 正確 |
| 過度權限 | 使用 IAM 最小權限原則 |
| 意外刪除 | Claude Code 會在危險操作前確認 |

## 其他雲端平台

同樣的模式適用於：

| 平台 | CLI 工具 | Claude Code 支援 |
|------|----------|------------------|
| AWS | `aws` | 完整支援 |
| Google Cloud | `gcloud` | 完整支援 |
| Azure | `az` | 完整支援 |
| Vercel | `vercel` | 完整支援 |
| Netlify | `netlify` | 完整支援 |

---

## 練習

1. 用 Claude Code 將一個靜態網頁部署到 S3
2. 用 AWS CLI 查詢一個 DynamoDB 表
3. 讓 Claude Code 幫你撰寫一個自動部署腳本
