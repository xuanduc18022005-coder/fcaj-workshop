+++
title = "1.9. Week 9 Worklog"
weight = 9
translationKey = "week-09"
+++

## Week 9 objectives:

- Explore the serverless architecture for NetMon.
- Implement DynamoDB, Lambda and API Gateway for network device management.
- Test device creation, updates, deletion and retrieval.

## Activities completed:

| Date | Activity | Reference |
|---|---|---|
| 10/10/2026 | Study DynamoDB and design the NetworkDevices table with deviceId, device metadata and status. | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| 12/10/2026 | Study and implement Lambda functions for CRUD operations and configure an IAM role for DynamoDB access. | [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) |
| 15/10/2026 | Implement an HTTP API using API Gateway, configure /devices and /devices/{id} routes, and test responses using HTML/JavaScript. | [API Gateway + Lambda + DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) |

## Week 9 outcomes:

- Prepare a table for device management data.
- Complete basic device management APIs for testing.
- Understand the request flow through API Gateway, Lambda and DynamoDB.
