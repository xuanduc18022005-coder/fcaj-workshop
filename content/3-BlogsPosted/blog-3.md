+++
title = "3.3. Blog 3: Automate emailed document processing with Amazon Bedrock and SES"
weight = 3
translationKey = "blog-3"
+++

## Collecting documents by email
Businesses often receive invoices, forms and support documents from many senders. Manually downloading and categorizing every message slows processing and creates opportunities for errors. AWS presents an event-driven approach to email intake.

## Processing flow
Amazon SES Mail Manager accepts incoming messages according to routing rules. Depending on configuration, attachments and data are stored in Amazon S3. Lambda processes content and invokes Amazon Bedrock to assist classification. DynamoDB stores metadata and status for downstream processing. The companion CDK sample provisions the components.

{{< photo src="blogs/email-pipeline.svg" alt="Processing flow – technical illustration" caption="Processing flow – technical illustration" >}}

## AI assistance still needs controls
A model can suggest document categories and urgency, but results can be inaccurate or influenced by malicious content in email. Email instructions must not automatically authorize sensitive actions. Validate attachment types and sizes, restrict S3 access, use encryption and establish human review for sensitive cases.

## Try the sample
Review the README for SES, domain and Bedrock prerequisites before deploying CDK. Use synthetic messages with no personal information. Inspect S3 objects and DynamoDB metadata, and compare classification with expected labels. Remove the stack and check for remaining chargeable resources or add-ons.

## Takeaway
AI is one controlled step in a broader workflow rather than the whole system. This is an independent AWS business-automation example, not part of NetMon.

> **Original AWS article:** [Automate emailed document processing with Amazon Bedrock and SES](https://aws.amazon.com/blogs/messaging-and-targeting/build-an-ai-email-pipeline-with-amazon-bedrock-and-ses-mail-manager/)
>
> **GitHub sample:** [sample-amazon-ses-mail-manager-attachment-pipeline](https://github.com/aws-samples/sample-amazon-ses-mail-manager-attachment-pipeline)
