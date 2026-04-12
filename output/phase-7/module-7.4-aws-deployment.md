# 7.4 AWS and Cloud Deployment

## 🎯 Learning Objectives

After completing this module, you will be able to:
- Understand what AWS is and why it is the most popular cloud platform for deployment
- Use Claude Code to deploy a static website to S3 with CloudFront CDN
- Manage cloud servers (EC2/Lightsail) and databases (DynamoDB) through the AWS CLI
- Follow security best practices for AWS credentials and IAM permissions
- Recognize that the same CLI pattern works for Google Cloud, Azure, Vercel, and other platforms

## 📖 Theory Explanation

### Why AWS?

AWS (Amazon Web Services) is one of the most widely used cloud platforms in the world. Think of AWS as a massive utility company — but instead of providing electricity and water, it provides servers, storage, databases, and networking. Just like you pay your electricity bill based on how much you use, AWS charges you based on the cloud resources you consume.

For Claude Code users, AWS is important because it is where your finished projects go **live**. You might build an amazing website or API on your local computer, but for the rest of the world to see it, you need to deploy it to the cloud. AWS is the most common destination for that deployment.

### How Claude Code Talks to AWS

Claude Code does not need any special plugin or extension to work with AWS. It uses the **AWS CLI** (Command Line Interface) — a tool that lets you manage all of AWS from your terminal. This is the same tool that professional DevOps engineers use every day.

Think of the AWS CLI as a universal remote control for the cloud. Instead of clicking through the AWS website (which has hundreds of confusing menus), you type short commands that do the same thing in seconds.

The only requirement is that you run `aws configure` once to set up your access keys. After that, Claude Code can run any AWS command on your behalf.

### Key AWS Services You Should Know

Here is a quick guide to the AWS services you will encounter most often:

| Service | What It Does | Everyday Analogy |
|---------|-------------|------------------|
| **S3** | Stores files (images, HTML, CSS, JS) | A giant filing cabinet in the cloud |
| **CloudFront** | Delivers your files fast worldwide | A network of local post offices (CDN) |
| **EC2 / Lightsail** | Virtual servers you can SSH into | A computer you rent by the hour |
| **DynamoDB** | NoSQL database for fast read/writes | A super-fast digital spreadsheet |
| **Lambda** | Runs code without managing servers | A vending machine — put in a request, get a result |
| **IAM** | Manages who can access what | The security guard at the front door |

## AWS CLI Integration

Claude Code natively supports the AWS CLI — as long as your system has `aws configure` set up:

```bash
# S3 — Upload files to cloud storage
aws s3 sync dist/ s3://my-website-bucket/ --delete

# Lightsail — Check the status of a cloud server
aws lightsail get-instance --instance-name my-server

# DynamoDB — Read all items from a database table
aws dynamodb scan --table-name BookingRecords

# Lambda — Run a serverless function
aws lambda invoke --function-name processBooking output.json
```

## 💻 Code Example 1: Deploying a Static Website to S3 + CloudFront

This is one of the most common workflows: building a frontend project and deploying it to the web. S3 stores the files, and CloudFront distributes them globally so users everywhere get fast load times.

```bash
# Step 1: Build your frontend project
# This creates a "dist/" folder with optimized HTML, CSS, and JS
npm run build

# Step 2: Upload (sync) the built files to your S3 bucket
# --delete removes old files that no longer exist locally
aws s3 sync dist/ s3://blog.example.com/ --delete

# Step 3: Verify the upload was successful
# This lists all files in your bucket
aws s3 ls s3://blog.example.com/ --recursive --human-readable

# Step 4: Invalidate the CloudFront CDN cache
# This tells CloudFront to fetch the new files from S3
# Without this, users might see the old version for up to 24 hours
aws cloudfront create-invalidation \
  --distribution-id E1234567 \
  --paths "/*"

# Step 5: Check the invalidation status
aws cloudfront get-invalidation \
  --distribution-id E1234567 \
  --id INVALIDATION_ID
```

### Expected Output:
```
upload: dist/index.html to s3://blog.example.com/index.html
upload: dist/assets/style.css to s3://blog.example.com/assets/style.css
upload: dist/assets/app.js to s3://blog.example.com/assets/app.js
delete: s3://blog.example.com/old-page.html

{
    "Invalidation": {
        "Id": "I1234567890ABC",
        "Status": "InProgress",
        "CreateTime": "2026-04-11T10:30:00Z"
    }
}
```

Within a few minutes, your updated website is live worldwide!

## 💻 Code Example 2: Working with DynamoDB via Python (boto3)

For more complex database operations, Claude Code can write Python scripts using `boto3` (the AWS SDK for Python). This is especially useful when you need to process data, not just read or write single items.

```python
import boto3
from datetime import datetime

# Connect to DynamoDB
# boto3 automatically uses your AWS credentials from 'aws configure'
dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-2')
table = dynamodb.Table('BookingRecords')

# --- Read a single item by its primary key ---
response = table.get_item(Key={'booking_id': 'BK-2026-0411-001'})
item = response.get('Item')
if item:
    print(f"Booking found: {item['customer_name']} — {item['route']}")
else:
    print("Booking not found")

# --- Write a new item ---
table.put_item(Item={
    'booking_id': f"BK-{datetime.now().strftime('%Y-%m%d-%H%M')}",
    'customer_name': 'Jane Smith',
    'route': 'Airport → CBD',
    'price': 180,
    'status': 'confirmed',
    'created_at': datetime.now().isoformat()
})
print("New booking record created!")

# --- Query all bookings with a specific status ---
from boto3.dynamodb.conditions import Attr

response = table.scan(
    FilterExpression=Attr('status').eq('confirmed')
)
confirmed = response['Items']
print(f"\nFound {len(confirmed)} confirmed bookings:")
for booking in confirmed[:5]:
    print(f"  {booking['booking_id']}: {booking['customer_name']} — ${booking['price']}")
```

### Expected Output:
```
Booking found: John Doe — CBD → Airport
New booking record created!

Found 12 confirmed bookings:
  BK-2026-0410-0900: Alice Wong — $120
  BK-2026-0410-1430: Bob Chen — $95
  BK-2026-0411-0800: Jane Smith — $180
  BK-2026-0411-1100: Carlos Rivera — $150
  BK-2026-0411-1500: Diana Patel — $200
```

## Server Management (Lightsail / EC2)

```bash
# SSH into the server
ssh -i my-key.pem ubuntu@13.211.221.35

# Execute commands remotely (without opening an interactive session)
ssh -i my-key.pem ubuntu@13.211.221.35 "sudo systemctl restart nginx"
```

Claude Code can help you:
- Write deployment scripts that automate the entire process
- Diagnose server issues by reading logs remotely
- Set up CI/CD pipelines that deploy automatically when you push to GitHub

## Security Considerations

AWS security is critically important. A leaked AWS key can allow someone to spin up expensive servers, delete your data, or access your customers' information. Think of your AWS credentials like the master key to your entire digital infrastructure.

| Risk | Safeguard |
|------|-----------|
| AWS key leakage | Never commit `~/.aws/credentials` to Git |
| S3 public access | Verify the bucket policy is correct — don't accidentally make private data public |
| Excessive permissions | Follow the IAM least-privilege principle — only grant what is needed |
| Accidental deletion | Claude Code confirms before dangerous operations like deleting buckets |
| Runaway costs | Set up AWS Budgets and billing alerts to avoid surprise bills |

> Pro tip: Ask Claude Code to help you review your S3 bucket policies and IAM roles. It can spot overly permissive settings that humans often miss.

## Other Cloud Platforms

The great news is that the pattern you learned with AWS applies to every major cloud platform. Claude Code can use any CLI tool that is installed on your system:

| Platform | CLI Tool | Claude Code Support |
|----------|----------|---------------------|
| AWS | `aws` | Full support |
| Google Cloud | `gcloud` | Full support |
| Azure | `az` | Full support |
| Vercel | `vercel` | Full support |
| Netlify | `netlify` | Full support |

The commands are different, but the workflow is the same: configure the CLI once, then let Claude Code handle the rest.

## ✍️ Hands-On Exercises

**Exercise 1: Deploy a Simple Website to S3**

1. Create a simple `index.html` file with some content (ask Claude Code to help!)
2. Run `aws configure` to set up your AWS credentials (you need an AWS account)
3. Ask Claude Code: "Create an S3 bucket called my-first-website-[your-name], enable static website hosting, and upload my index.html"
4. Open the S3 website URL in your browser to see your live site

> Hint: S3 bucket names must be globally unique. Add your name or a random number to avoid conflicts. If you do not have an AWS account, you can sign up for the free tier at [aws.amazon.com/free](https://aws.amazon.com/free).

**Exercise 2: Write a Deployment Script**

1. Ask Claude Code: "Write a bash script called deploy.sh that builds my project, syncs it to S3, and invalidates the CloudFront cache. Include error handling so it stops if any step fails."
2. Review the script Claude Code generates
3. Try running it (or dry-run it with `--dryrun` flag for `aws s3 sync`)

> Hint: A good deployment script uses `set -e` at the top to stop on errors, and prints each step so you can see what is happening.

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

<div class="quiz-q" data-answer="3">
<p>4. What does the <code>--delete</code> flag do in <code>aws s3 sync dist/ s3://my-bucket/ --delete</code>?</p>
<label><input type="radio" name="q4" value="0"> It deletes the local dist/ folder after uploading</label>
<label><input type="radio" name="q4" value="1"> It deletes the S3 bucket entirely</label>
<label><input type="radio" name="q4" value="2"> It permanently deletes all previous versions of files</label>
<label><input type="radio" name="q4" value="3"> It removes files from S3 that no longer exist in the local dist/ folder</label>
<div class="quiz-explain">The <code>--delete</code> flag ensures the S3 bucket is an exact mirror of your local folder. If you deleted or renamed a file locally, <code>--delete</code> will remove the old file from S3 too. Without this flag, old files would accumulate in your bucket over time.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is AWS CloudFront, and why do you need to invalidate its cache after deploying?</p>
<label><input type="radio" name="q5" value="0"> CloudFront is a database service; invalidation clears old records</label>
<label><input type="radio" name="q5" value="1"> CloudFront is a CDN that caches files globally; invalidation forces it to fetch updated files from S3</label>
<label><input type="radio" name="q5" value="2"> CloudFront is a server monitoring tool; invalidation restarts the monitoring</label>
<label><input type="radio" name="q5" value="3"> CloudFront is a deployment tool; invalidation undoes the last deployment</label>
<div class="quiz-explain">CloudFront is a Content Delivery Network (CDN) — it caches copies of your website files in servers around the world for faster delivery. After you update files in S3, you must invalidate (clear) the cache so CloudFront fetches the new versions. Otherwise, users might see the old version for up to 24 hours.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. Which Python library does Claude Code use to interact with AWS services programmatically?</p>
<label><input type="radio" name="q6" value="0"> aws-sdk</label>
<label><input type="radio" name="q6" value="1"> pyaws</label>
<label><input type="radio" name="q6" value="2"> boto3</label>
<label><input type="radio" name="q6" value="3"> amazon-python</label>
<div class="quiz-explain"><code>boto3</code> is the official AWS SDK for Python. It provides Python-friendly methods for interacting with all AWS services — S3, DynamoDB, Lambda, EC2, and more. It automatically uses the credentials you set up with <code>aws configure</code>.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What should you set up to avoid surprise AWS bills when using Claude Code for cloud operations?</p>
<label><input type="radio" name="q7" value="0"> AWS Budgets and billing alerts</label>
<label><input type="radio" name="q7" value="1"> A daily spending log in a spreadsheet</label>
<label><input type="radio" name="q7" value="2"> A Claude Code spending limit setting</label>
<label><input type="radio" name="q7" value="3"> Auto-shutdown scripts that turn off AWS every night</label>
<div class="quiz-explain">AWS Budgets allows you to set spending thresholds and receive email alerts when your costs approach or exceed your budget. This is especially important when automating cloud operations with Claude Code, since automated scripts can accidentally create expensive resources if something goes wrong.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. Why is the AWS CLI pattern important beyond just AWS?</p>
<label><input type="radio" name="q8" value="0"> It is the only CLI pattern that Claude Code supports</label>
<label><input type="radio" name="q8" value="1"> All cloud platforms use identical commands to AWS</label>
<label><input type="radio" name="q8" value="2"> AWS is the only cloud platform available for beginners</label>
<label><input type="radio" name="q8" value="3"> The same CLI workflow pattern (configure once, run commands) applies to Google Cloud, Azure, Vercel, and Netlify</label>
<div class="quiz-explain">The pattern of configuring a CLI tool once and then letting Claude Code run commands applies to every major cloud platform. Whether you use <code>aws</code>, <code>gcloud</code>, <code>az</code>, <code>vercel</code>, or <code>netlify</code>, the workflow is the same — making the skills you learn here transferable across platforms.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You have now learned how to deploy your projects to the cloud using AWS and Claude Code. In the final module of this phase, **Module 7.5**, we will zoom out and look at the complete third-party integration map — helping you see the big picture of how all these tools fit together.
