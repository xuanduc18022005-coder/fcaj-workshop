+++
title = "3. Blogs Posted"
weight = 3
translationKey = "blogs"
+++

This section introduces three technical blog posts I studied and wrote during my internship. Each article explores an AWS solution and includes a flow diagram, the original article, and sample code for further study.

## [Blog 1 - EFFICIENT BATCH PROCESSING WITH AWS LAMBDA AND AMAZON SQS](blog-1/)

This article introduces how Amazon SQS and AWS Lambda can work together to process messages in batches. It explains parallel processing within a single invocation, partial batch failure handling, and techniques for avoiding duplicate processing. These concepts help improve the efficiency of asynchronous workloads on AWS.

## [Blog 2 - TROUBLESHOOT FASTER WITH STRUCTURED LOGS IN AMAZON CLOUDWATCH](blog-2/)

This article explores the use of structured JSON logs to monitor applications and investigate incidents. It explains how CloudWatch Logs Insights supports queries, how Embedded Metric Format (EMF) extracts metrics, and how latency and errors can be analyzed by service to narrow down an investigation.

## [Blog 3 - AUTOMATE EMAILED DOCUMENT PROCESSING WITH AMAZON BEDROCK AND SES](blog-3/)

This article introduces an automated approach to receiving and classifying documents sent by email using Amazon SES Mail Manager, AWS Lambda, and Amazon Bedrock. It describes storing attachments in Amazon S3 and tracking processing metadata in DynamoDB, while highlighting security considerations and the need to validate AI-generated results.
