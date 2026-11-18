+++
title = "3.2. Blog 2: Troubleshoot faster with structured logs in Amazon CloudWatch"
weight = 2
translationKey = "blog-2"
+++

## An alarm is only the starting point
CPU usage and error counts can signal a problem, but operators also need to know which request failed, in which service, and when. Structured logs help connect these details.

## From plain text to queryable data
An application can record JSON events containing timestamps, request IDs, services, severity, duration and error codes. CloudWatch Logs Insights filters and aggregates fields. Embedded Metric Format (EMF) can extract metrics from appropriately annotated log events for dashboards and alarms.

{{< photo src="blogs/structured-logs.svg" alt="Processing flow – technical illustration" caption="Processing flow – technical illustration" >}}

## Investigation example
For application JSON logs containing `durationMs`, an example query groups slow or failed requests by service:

```text
fields @timestamp, service, requestId, durationMs, level
| filter level = "ERROR" or durationMs > 500
| stats count(*) as requests, pct(durationMs, 95) as p95 by service
| sort p95 desc
```

The result narrows the investigation; it does not establish the root cause by itself. Correlate the timestamps, request logs and relevant metrics.

## Try the sample
The One Observability Demo repository provides a microservice sample. Follow the deployment guide, generate test traffic, and use Logs Insights with the actual log fields. Set retention, avoid logging tokens or sensitive data, and remove lab resources afterward.

## Takeaway
A consistent logging structure makes troubleshooting less dependent on reading lines manually. It is a useful improvement for monitoring APIs alongside CPU/RAM metrics and alert history.

> **Original AWS article:** [Troubleshoot faster with structured logs in Amazon CloudWatch](https://aws.amazon.com/blogs/mt/accelerate-troubleshooting-with-structured-logs-in-amazon-cloudwatch/)
>
> **GitHub sample:** [one-observability-demo](https://github.com/aws-samples/one-observability-demo)
