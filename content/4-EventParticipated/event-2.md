+++
title = "4.2. Event 2 – FCAJ Meetup 17/10"
weight = 2
translationKey = "event-2"
+++

**Event:** First Cloud AI Journey – Community Day / Hanoi Weekly Meetup

**Date:** Saturday, October 17, 2026, 09:00–12:00.

**Venue:** Floor 7, Grand Terra, 36 Cat Linh, Hanoi.

## Event objectives

- Share practical experience in securing cloud-based AI applications.
- Introduce AWS multi-account organization and governance.
- Explore Apache Iceberg and modern data-platform concepts.
- Raise awareness of network security and support connections within the technology community.

## Speakers

- **Nguyễn Thành Trung** – Software Engineer, FPT Software: Securing Chatbots When Calling LLM APIs.
- **Phạm Minh Quang** – Cloud Engineer, NTQ Solution: Migration Journey: From Disconnected AWS Accounts to a Landing Zone.
- **Vũ Thế Huy** – Data Engineer, Rikkeisoft: Beyond Parquet: Apache Iceberg on AWS.

The program also covered network security on AWS.

{{< photo src="events/fcaj-community-day-17-10-poster.jpg" alt="October 17, 2026 Community Day poster" caption="Program and speaker poster" >}}

## Key highlights

### Securing chatbots when calling LLM APIs

Chatbots connected to language models must protect data and systems in addition to providing useful responses. The session covered prompt injection, sensitive data protection and secure AI agent integration.

- Validate and limit inputs before sending them to a model.
- Avoid exposing sensitive information in prompts or logs when it is unnecessary.
- Restrict the tools an agent can use; model output is not an authentication mechanism.

### The migration journey to an AWS Landing Zone

When AWS accounts are created and managed separately, consistent governance, permissions and resource management can become difficult. AWS Control Tower supports a governed multi-account environment.

- Organize accounts by environment or purpose.
- Establish governance rules and access controls.
- Reduce the scope of impact when an environment experiences an incident.

### Apache Iceberg on AWS

Apache Iceberg is an open table format for large-scale data platforms. Beyond storing Parquet files, Iceberg provides mechanisms for managing table metadata and versions.

- **Snapshots:** Record the state of a table at a point in time.
- **Time travel:** Supports querying previously retained versions of data.
- **Schema evolution:** Enables more flexible changes to table schemas.

### Network security on AWS

This topic connects network segmentation, access control and defense in depth with cloud infrastructure design. Each protective layer should be chosen according to workload requirements instead of granting unnecessary access.

## What I learned

### System design mindset

- Security should be considered from the design stage, not only after application development.
- Distinguish application, data, account and network problems before selecting AWS services.
- Clear architectural boundaries support manageability and help limit the impact of failures.

### Technical knowledge

- Recognize fundamental risks associated with LLM API integration.
- Understand AWS Control Tower's role in multi-account governance.
- Understand the concepts of snapshots, time travel and schema evolution in Apache Iceberg.
- Reinforce knowledge of network segmentation and access control.

## Application to my work

- Validate JWTs and access permissions before API Gateway forwards requests to Lambda in NetMon Cloud.
- Limit IAM permissions for each function and avoid logging sensitive information.
- Coordinate with the infrastructure teammate to review security groups and EC2 access paths.
- Continue studying Landing Zone and Iceberg for larger-scale use cases; neither is a deployed NetMon component.

## Event experience

Community Day provides a broader perspective on AWS beyond creating resources in the Console. The connections between security, account governance, data platforms and networking illustrate why system development requires knowledge across several domains.

### Learning from the speakers' experience

The chatbot and Landing Zone topics help me understand challenges that can arise as applications grow. Iceberg is a new topic for me and encourages further study of cloud data management.

### Connecting the event to my internship

During NetMon development, my responsibilities focus on Lambda, API Gateway and DynamoDB. The event topics reinforce the importance of considering permissions, authentication and network infrastructure alongside API functionality.

### Lessons learned

- Choose technologies according to actual requirements rather than novelty.
- Consider security, governance and cost when designing architecture.
- Continue self-study after sharing sessions to turn knowledge into practical skills.

## Event visuals

{{< photo src="events/event-2-activity.jpg" alt="Technical sharing session" >}}
