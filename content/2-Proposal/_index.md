+++
title = "2. Proposal"
weight = 2
translationKey = "proposal"
+++

# NetMon Cloud – Network Infrastructure Management and Monitoring for Small and Medium-Sized Enterprises on AWS

## A Unified AWS Serverless Solution for Network Infrastructure Monitoring

### 1. Executive Summary

**Project title:** Building a network infrastructure management and monitoring system for small and medium-sized enterprises on AWS using serverless services.

**Product name:** NetMon Cloud.

**Implementation format:** Group project (3 students):

- **Nguyễn Tùng Dương** – VPC, EC2 and network infrastructure security.
- **Tran Xuan Duc** – AWS Lambda, API Gateway, DynamoDB and device management functions.
- **Lê Mạnh Quân** – CloudWatch, SNS, user interface and testing.

**Environment:** AWS Region us-east-1; HTML, CSS and JavaScript interface; development using Visual Studio Code.

NetMon Cloud aims to centralize infrastructure monitoring, device management and alerts on AWS. Its scope includes simulated devices and an experimental EC2 instance; AWS connectivity and deployment need to be verified in the actual environment.

### 2. Problem Statement

#### What’s the Problem?

Small and medium-sized enterprises use routers, switches, servers and Wi-Fi access points. Checking each device separately or managing inventory in spreadsheets becomes difficult as the number of devices increases, especially when detecting overload and tracking incident handling.

#### The Solution

Our team proposes NetMon Cloud to centralize device information, CPU/RAM metrics and alerts. AWS serverless services process APIs and data, reducing the need to operate a dedicated application server. EC2 serves as an experimental server monitored through CloudWatch; unavailable network devices use simulated data. This project allows the team to apply networking, cloud computing, programming and security knowledge during First Cloud AI Journey.

#### Benefits and Return on Investment

Centralized monitoring reduces repetitive device checks, enables earlier detection and records incident handling. Managed AWS services reduce the effort of operating a dedicated application server. As a student project, actual return on investment and time savings have not been measured.

### 3. Solution Architecture

{{< photo src="proposal/architecture-en.svg" alt="NetMon Cloud solution architecture" >}}

#### AWS Services Used

| Technology | Role |
|---|---|
| Amazon VPC, Subnet, Route Table, Internet Gateway, Security Group | Organize the network infrastructure and control EC2 connectivity. |
| Amazon EC2 and CloudWatch Agent | Experimental server providing actual CPU/RAM metrics when fully configured. |
| Amazon Cognito | Authenticates users using OAuth 2.0 Authorization Code with PKCE. |
| Amazon API Gateway | Receives HTTPS, validates JWTs when the authorizer is configured and invokes Lambda. |
| AWS Lambda | Processes device APIs, metrics, alerts, settings and logs; simulates data and handles events. |
| Amazon DynamoDB | Stores devices, alerts, logs and settings. |
| Amazon EventBridge Scheduler | Invokes the simulation Lambda on a configured schedule. |
| DynamoDB Streams | Provides device change events to monitoring and audit functions. |
| Amazon CloudWatch | Collects EC2 metrics and logs and supports alarms. |
| Amazon SNS | Sends alert emails using a topic and confirmed subscriptions. |

#### Component Design and Data Flow

1. Users authenticate through Cognito; the interface sends the access token with requests to API Gateway.
2. Lambda processes requests and reads/writes DynamoDB; the interface displays the results.
3. The simulation Lambda updates CPU/RAM on a schedule. DynamoDB Streams can invoke threshold checks and audit functions. When a qualifying alert occurs, the monitor stores its history and publishes to SNS.
4. For EC2, the API queries CloudWatch for CPUUtilization, NetworkIn/NetworkOut and RAM reported by the CloudWatch Agent. CloudWatch alarms can publish to SNS through their own configuration.
5. Users review and acknowledge or resolve alerts. Resolution does not prove that resource usage has returned to safe levels; monitoring continues.

#### Data Storage Design

| DynamoDB table | Contents |
|---|---|
| NetworkDevices | Device ID, name, type, IP, location, status, CPU/RAM, update time and instanceId for linked EC2 instances. |
| NetworkAlerts | Event ID, device, abnormal metric, threshold, timestamp and handling status. |
| NetworkAuditLogs | Device change history from DynamoDB Streams; actor identity is not inherently available. |
| NetworkSettings | CPU/RAM thresholds and simulation interval settings. |

### 4. Technical Implementation

#### Implementation Phases

- Design VPC, EC2, IAM and the serverless architecture.
- Build management APIs, simulation and storage.
- Integrate Cognito, CloudWatch, SNS and the interface.
- Test main workflows, review costs and finalize deployment instructions.

#### Technical Requirements

The project focuses on a small experimental environment. Routers, switches and firewalls without connected metric collectors use simulated data. EC2 is monitored using CloudWatch and the CloudWatch Agent when fully configured. The infrastructure diagram is a logical representation, not an automatically discovered network map. The project does not yet collect SNMP/telemetry from all physical devices or implement automatic remediation.

Use HTML, CSS, JavaScript and Python for Lambda; AWS resources and the simulation schedule are configured separately.

#### Dashboard

The dashboard shows device counts, operational status, abnormal devices, unresolved alerts and CPU/RAM trends.

#### Device Management

Users can search by name, identifier, IP or location, filter by status and perform CRUD operations. With a valid AWS connection, data is stored in NetworkDevices.

#### Monitoring, Alerts and Logs

The metrics page displays CPU/RAM and data sources. V3.4 supports EC2 CloudWatch history queries from 15 minutes to 24 hours. Users can view, filter, acknowledge and resolve alerts and browse alert history and device changes when the corresponding APIs are deployed.

#### Settings and Security

Users can configure CPU/RAM thresholds, automatic browser refresh and simulation intervals. When corresponding APIs are deployed, settings synchronize with AWS. Browser refresh and simulation generation intervals are independent. Use least-privilege IAM, JWT authorization and CORS restricted to legitimate origins; do not store AWS access keys, secret access keys or passwords in frontend code.

### 5. Timeline & Milestones

| Period | Activities | Responsibility |
|---|---|---|
| 03/10–08/10/2026 | Agree on requirements, assign responsibilities, design architecture and data. | Whole team |
| 10/10–15/10/2026 | Prepare VPC, subnets, EC2, security groups and IAM permissions. | Nguyễn Tùng Dương |
| 17/10–22/10/2026 | Study and implement DynamoDB, Lambda and API Gateway; test CRUD. | Tran Xuan Duc |
| 24/10–29/10/2026 | Implement CloudWatch, SNS, alert thresholds and monitoring interface. | Lê Mạnh Quân, with team support |
| 31/10–05/11/2026 | Integrate APIs, authentication, simulation, EC2 metrics and alert history. | Whole team |
| 07/11–14/11/2026 | Test integration, resolve issues, finalize report and prepare demo. | Whole team |

### 6. Budget Estimation

Illustrative estimate for us-east-1, assuming one Linux t3.micro EC2 instance, an 8 GB gp3 EBS volume, one public IPv4 address and 730 running hours per month. This is a pre-credit scenario, not the team's AWS bill.

#### Infrastructure Costs

| Resource | Assumption | USD/month |
|---|---|---:|
| EC2 t3.micro | 730 hours × $0.0104 | 7.59 |
| EBS gp3 | 8 GB × $0.08 | 0.64 |
| Public IPv4 | 730 hours × $0.005 | 3.65 |
| **Infrastructure subtotal** | Excludes usage-based services | **11.88** |
| Lambda, API Gateway, DynamoDB, EventBridge, Cognito, SNS, CloudWatch | Depends on requests, reads/writes, schedules, users, email, metrics and logs | To be estimated |

Actual costs vary with runtime, configuration, traffic, CPU credits, tax and available AWS credits. The team will use the [AWS Pricing Calculator](https://calculator.aws/) with actual settings, configure AWS Budgets and review Billing. Budget alerts do not automatically prevent all charges. No additional physical network equipment is required for the simulation scope.

Price sources: [EC2 T3](https://aws.amazon.com/ec2/instance-types/t3/), [Amazon EBS](https://aws.amazon.com/ebs/pricing/), [Amazon VPC](https://aws.amazon.com/vpc/pricing/).

### 7. Risk Assessment

#### Risk Matrix

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| IAM, JWT or CORS misconfiguration | High | Medium | Least privilege; verify authorizer and origin. |
| Simulation Lambda does not run | Medium | Medium | Check Scheduler, invocation permissions and logs. |
| Missing EC2 RAM metrics | Medium | Medium | Check CloudWatch Agent, namespace and dimensions. |
| SNS subscription or delivery failure | High | Medium | Verify subscription, publish permission and logs. |
| Cost overrun | Medium | Medium | AWS Budgets, reasonable intervals and resource cleanup. |

#### Contingency Plans

Back up source code and settings before changes; restore the previous working version if integration fails. If AWS connectivity fails, show an error or explicitly labeled demo mode rather than substituting simulated data for live metrics.

### 8. Expected Outcomes

#### Technical Improvements

- Build a centralized management interface and authenticate users before access to AWS data.
- Support creating, viewing, updating, deleting, searching and filtering network devices.
- Monitor status, CPU and RAM; distinguish simulated data from actual EC2 CloudWatch metrics.
- Detect threshold breaches and send SNS email notifications according to the monitoring configuration.
- Store alert history and support acknowledgement and resolution.
- Test the main features and prepare the report and demo video.

#### Testing Criteria and Deliverables

| Scenario | Expected result |
|---|---|
| Not authenticated or token expired | Protected API access is rejected and reauthentication is required. |
| Create, update and delete devices | Interface reflects DynamoDB records following synchronization. |
| CPU/RAM simulation | Values change according to the schedule and are labeled simulated. |
| Read EC2 metrics | Show CloudWatch data; missing values appear as —, not fabricated zeroes. |
| Threshold breach | Create alerts and send email when the SNS workflow is operational. |
| Acknowledge and resolve alerts | Handling status is updated and history remains available. |
| API connection failure | Display an error without misrepresenting demo data as live data. |

Expected deliverables include the NetMon Cloud application, source code, architecture, deployment instructions, internship report and demo video. Live AWS testing must be verified separately.

#### Long-term Value

The architecture and source code can be reused for networking and cloud exercises. Future extensions may integrate SNMP/telemetry, role-based authorization and improved resilience.

