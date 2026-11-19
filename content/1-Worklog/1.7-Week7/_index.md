+++
title = "1.7. Week 7 Worklog"
weight = 7
translationKey = "week-07"
+++

## Week 7 objectives:

- Agree on the group project topic, plan the work and assign responsibilities.
- Define functional requirements.
- Design data model.
- Outline the architecture.

## Activities completed:

| Date | Activity | Source / reference |
|---|---|---|
| 03/10/2026 | Discuss the NetMon project, plan implementation and allocate tasks among three members: network infrastructure and EC2; serverless backend; monitoring, UI and testing. Identify device CRUD, CPU/RAM metrics, online/offline state and alert history. | — |
| 05/10/2026 | Sketch NetworkDevices and NetworkAlerts with deviceId, status, cpuUsage, memoryUsage and lastUpdated. | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| 08/10/2026 | Map frontend → API Gateway → Lambda → DynamoDB plus CloudWatch/SNS alerts. | [API Gateway + Lambda + DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) |

## Week 7 outcomes:

- Produce a group work plan, task assignments and a functional requirements checklist.
- Create a draft data schema.
- Prepare a system architecture diagram.
