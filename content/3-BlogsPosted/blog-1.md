+++
title = "3.1. Blog 1: Efficient batch processing with AWS Lambda and Amazon SQS"
weight = 1
translationKey = "blog-1"
+++

## When workloads spike
An application may receive hundreds of records in a short period. Processing all work synchronously can increase latency and errors. SQS decouples intake from processing, while Lambda consumes messages in batches.

## Parallel processing within a Lambda invocation
In the sample, a function distributes a batch across concurrent workers and waits for every worker before returning. I/O-bound tasks may finish sooner without a corresponding increase in invocations. Ordered workloads require a different design to preserve ordering.

{{< photo src="blogs/lambda-batch.svg" alt="Processing flow – technical illustration" caption="Processing flow – technical illustration" >}}

## Handling individual failures
With `ReportBatchItemFailures` enabled on the event source mapping, the function reports the identifiers of failed messages. Successful records need not be retried solely because another record fails. SQS can deliver duplicates, so consumers should be idempotent, for example using business identifiers or conditional DynamoDB writes.

## Try the sample
1. Review the README, CDK project and Node.js Lambda functions.
2. Deploy in an isolated lab according to the README and submit a batch containing a deliberately failing record.
3. Compare Duration, Errors, ConcurrentExecutions and queue depth; inspect retries.
4. Remove the stack and check the remaining queues and log groups.

## Takeaway
Adding more Lambda invocations is not always the right performance solution. Measure I/O waits and choose concurrency deliberately. This is a design reference, not an SQS feature already deployed in NetMon.

> **Original AWS article:** [Efficient batch processing with AWS Lambda and Amazon SQS](https://aws.amazon.com/blogs/compute/efficiently-processing-batched-data-using-parallelization-in-aws-lambda/)
>
> **GitHub sample:** [lambda-with-multithreading](https://github.com/aws-samples/lambda-with-multithreading)
