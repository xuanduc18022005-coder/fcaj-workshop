+++
title = "4.1. Event 1 – Prove It Day 01"
weight = 1
translationKey = "event-1"
+++

**Event:** Prove It – Agentic Cloud Investigation Series, Day 01: GOVERN – Observe Before You Act

**Date:** Saturday, September 5, 2026, 09:00–12:00.

**Organizers:** CloudThinker in collaboration with First Cloud AI Journey (FCAJ).

## Event objectives

- Introduce AI agent governance in cloud environments.
- Explore the Agent Supervisor role and how to define an agent's operating scope.
- Develop an approach to observing, analyzing and verifying information before deciding to change a system.
- Recognize the risks of granting AI tools access to cloud resources.

## Organizers and guidance

- **CloudThinker:** Co-organizer of the hands-on series on AI agents and cloud investigation.
- **First Cloud AI Journey (FCAJ):** Community co-organizer supporting learning activities.

## Key highlights

### The Agent Supervisor role

AI agents can help review and summarize information about cloud resources. However, supervisors need to define task boundaries, control permissions and evaluate the results before making decisions. A recommendation produced by an agent is not necessarily a verified conclusion.

### Governing permissions and operating scope

- **Scope:** Define the resources and tasks the agent may access.
- **Least privilege:** Grant only permissions needed for the task; observation does not automatically require write access.
- **Guardrails:** Set limits to reduce the risk of out-of-scope actions.
- **Human oversight:** Retain human review for important decisions.

### Observation and evidence verification

In the demo environment, learners review resources, examine agent findings, compare them with evidence, and summarize their conclusions in an Agentic Cloud Review. The purpose is to understand the basis of each finding rather than simply accept AI-generated answers.

The practice environment does not require personal AWS login credentials. Investigating and recommending changes does not imply automatically modifying infrastructure.

## What I learned

### Cloud governance mindset

- Distinguish observation permissions from execution permissions.
- Understand why access should be limited to its intended purpose.
- Recognize the role of human review in evaluating AI-generated recommendations.

### Analytical skills

- Define the question before collecting evidence.
- Compare analytical results with relevant configuration and data.
- Present findings in terms of the issue, evidence, impact and proposed solution.

## Application to my work

- Apply least privilege to Lambda IAM roles in NetMon Cloud.
- Distinguish read operations from create, update and delete operations when designing APIs.
- Check device status, CloudWatch data and logs before determining the cause of an alert.
- If AI is added in the future, prioritize analytical support before permitting it to change resources.

## Event experience

What interests me most about GOVERN is the combination of AI assistance and cloud security principles. A tool may process information quickly, but its permissions still need to be bounded and its findings reviewed by a responsible person.

### Learning from practical scenarios

The Agent Supervisor exercise illustrates the difference between using AI to retrieve information and authorizing AI to operate a system. This is useful knowledge when learning IAM and serverless services.

### Lessons learned

I need to develop the habit of checking evidence, documenting analysis and avoiding premature conclusions based on a single source. In a network management system, clearly defining each component's permissions is as important as implementing its features.

## Event visuals

{{< photo src="events/event-1-activity.jpg" alt="AI agent governance session" >}}
