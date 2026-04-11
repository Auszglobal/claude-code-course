# 7.4 AWS and Cloud Deployment

## Why AWS?

AWS is one of the most widely used cloud platforms. Claude Code can directly use the AWS CLI to manage your cloud resources.

## AWS CLI Integration

Claude Code natively supports the AWS CLI — as long as your system has `aws configure` set up:

```bash
# S3 — Static website deployment
aws s3 sync dist/ s3://my-website-bucket/ --delete

# Lightsail — Server management
aws lightsail get-instance --instance-name my-server

# DynamoDB — NoSQL database
aws dynamodb scan --table-name BookingRecords

# Lambda — Serverless functions
aws lambda invoke --function-name processBooking output.json
```

## Common AWS Workflows

### 1. Static Website Deployment (S3 + CloudFront)

```bash
# Build the frontend
npm run build

# Sync to S3
aws s3 sync dist/ s3://blog.example.com/ --delete

# Invalidate CDN cache (if using CloudFront)
aws cloudfront create-invalidation \
  --distribution-id E1234567 \
  --paths "/*"
```

### 2. Server Management (Lightsail / EC2)

```bash
# SSH into the server
ssh -i my-key.pem ubuntu@13.211.221.35

# Execute commands remotely
ssh -i my-key.pem ubuntu@13.211.221.35 "sudo systemctl restart nginx"
```

Claude Code can help you:
- Write deployment scripts
- Diagnose server issues
- Set up CI/CD pipelines

### 3. DynamoDB (NoSQL Database)

```python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DriverDeviceTokens')

# Read
response = table.get_item(Key={'driver_id': 'D001'})

# Write
table.put_item(Item={
    'driver_id': 'D001',
    'token': 'fcm_token_here',
    'platform': 'ios'
})
```

## Security Considerations

| Risk | Safeguard |
|------|-----------|
| AWS key leakage | Never commit `~/.aws/credentials` to Git |
| S3 public access | Verify the bucket policy is correct |
| Excessive permissions | Follow the IAM least-privilege principle |
| Accidental deletion | Claude Code confirms before dangerous operations |

## Other Cloud Platforms

The same pattern applies to:

| Platform | CLI Tool | Claude Code Support |
|----------|----------|---------------------|
| AWS | `aws` | Full support |
| Google Cloud | `gcloud` | Full support |
| Azure | `az` | Full support |
| Vercel | `vercel` | Full support |
| Netlify | `netlify` | Full support |

---

## Exercises

1. Use Claude Code to deploy a static webpage to S3
2. Query a DynamoDB table using the AWS CLI
3. Have Claude Code write an automated deployment script for you
