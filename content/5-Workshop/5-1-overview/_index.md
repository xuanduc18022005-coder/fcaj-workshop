+++
title = "5.1. Overview"
weight = 1
translationKey = "ws-overview"
+++

## Introduction

NetMon Cloud is a network infrastructure management and monitoring system for small and medium enterprises, built on AWS with serverless services. This workshop explains how to reproduce the system from its AWS environment to its management interface. The source uses **US East (N. Virginia) – us-east-1**.

## Workshop objectives

- Build a private network environment and monitor an EC2 instance.
- Build a device management API with Lambda, DynamoDB and API Gateway.
- Authenticate users with Cognito, Authorization Code + PKCE and a JWT authorizer.
- Update simulated CPU/RAM, detect threshold breaches, send SNS notifications and record logs.
- Connect the NetMon interface, test functionality and manage costs.

## System architecture

{{< photo src="proposal/architecture-en.svg" alt="Figure 1. Logical NetMon Cloud architecture." caption="Figure 1. Logical NetMon Cloud architecture." >}}

| Component | Role |
|---|---|
| VPC, EC2 | Network infrastructure and monitored server |
| CloudWatch, SNS | Actual EC2 metrics, alarms and email |
| EventBridge Scheduler | Invokes the simulator Lambda on a schedule |
| Lambda, DynamoDB Streams | CRUD, simulation, alert detection and audit logging |
| DynamoDB | Devices, settings, alerts and audit records |
| API Gateway, Cognito | HTTP API, JWT authentication and authorization scopes |
| HTML, CSS, JavaScript | NetMon dashboard running with Live Server |

## System workflow

**Management:** the browser signs in to Cognito, obtains an access token and makes HTTP requests through API Gateway. The JWT authorizer validates the token before Lambda accesses DynamoDB.

**Monitoring:** EC2 provides CloudWatch metrics. For simulated devices, Scheduler invokes the simulator every minute, and the simulator updates due records. DynamoDB Streams trigger the monitor and audit writer. The monitor evaluates thresholds, stores alerts and sends SNS notifications if configured; the audit writer records device changes. EC2 CloudWatch alarms operate separately; not every CloudWatch email is recorded in NetworkAlerts.

## Scope and evidence

Routers and switches are simulated in this release; they are not queried through SNMP. Interface topology links represent logical management relationships. EC2 metrics are live only when the AWS backend and agent are working. This guide is based on the team's NetMon Cloud metric-configuration source archive; diagrams and demo screenshots are illustrative, not verified against the live AWS Console. Replace example values with the team's existing resources before making changes.

**Related interface screenshots:** [System overview](../#netmon-overview) · [AWS architecture and network topology](../#netmon-topology).
