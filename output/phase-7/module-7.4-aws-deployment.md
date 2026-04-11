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

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the correct sequence for deploying a static website to S3 with CloudFront?</p>
<label><input type="radio" name="q1" value="0"> Upload files to S3, then run <code>npm run build</code></label>
<label><input type="radio" name="q1" value="1"> Run <code>npm run build</code>, sync to S3, then invalidate the CloudFront cache</label>
<label><input type="radio" name="q1" value="2"> Invalidate CloudFront cache first, then upload to S3</label>
<label><input type="radio" name="q1" value="3"> Push to GitHub and S3 deploys automatically</label>
<div class="quiz-explain">The correct deployment sequence is: build the frontend (<code>npm run build</code>), sync the built files to S3 (<code>aws s3 sync</code>), and then invalidate the CloudFront CDN cache so users see the latest version.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. Which security principle should you follow when setting up AWS IAM permissions for Claude Code?</p>
<label><input type="radio" name="q2" value="0"> Give full administrator access for convenience</label>
<label><input type="radio" name="q2" value="1"> Share AWS credentials with all team members</label>
<label><input type="radio" name="q2" value="2"> Follow the principle of least privilege -- only grant necessary access</label>
<label><input type="radio" name="q2" value="3"> Use the root account for all operations</label>
<div class="quiz-explain">The IAM least-privilege principle means only granting the minimum permissions needed. Never commit AWS credentials to Git, verify bucket policies, and have Claude Code confirm before dangerous operations.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. How does Claude Code interact with AWS services?</p>
<label><input type="radio" name="q3" value="0"> Through the AWS CLI, as long as <code>aws configure</code> is set up on your system</label>
<label><input type="radio" name="q3" value="1"> Through a special AWS MCP server that must be installed separately</label>
<label><input type="radio" name="q3" value="2"> Only through Python boto3 scripts</label>
<label><input type="radio" name="q3" value="3"> Through the AWS web console using Computer Use</label>
<div class="quiz-explain">Claude Code natively supports the AWS CLI. As long as your system has <code>aws configure</code> set up with valid credentials, Claude Code can directly run AWS commands for S3, Lightsail, DynamoDB, Lambda, and more.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Use Claude Code to deploy a static webpage to S3
2. Query a DynamoDB table using the AWS CLI
3. Have Claude Code write an automated deployment script for you
