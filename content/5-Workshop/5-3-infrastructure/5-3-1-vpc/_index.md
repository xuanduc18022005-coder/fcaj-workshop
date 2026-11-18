+++
title = "5.3.1. Create VPC, subnets, route tables and IGW"
weight = 1
translationKey = "ws-2-1"
+++

## Steps

1. Open VPC → Your VPCs → Create VPC, or reuse the existing VPC. Example CIDR: `10.0.0.0/16`.
2. Create public subnet `10.0.0.0/20` and optional private subnet `10.0.128.0/20` in a suitable AZ.
3. Attach an Internet Gateway. Add a `0.0.0.0/0` IGW route to the public route table and associate the correct subnet. Do not add an IGW route to the private subnet.
4. Create the EC2 security group. Avoid SSH from all addresses; prefer Session Manager when permissions and connectivity are ready. Allow only necessary inbound traffic.

## Verification

Check subnet associations, the public route and restricted security groups. Avoid an unnecessary NAT Gateway for this demo because it can incur costs.

Reference: [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).

## Example settings

| Component | Value in team screenshots |
|---|---|
| VPC | netmon-vpc, 10.0.0.0/16 |
| Public subnet | 10.0.0.0/20 |
| Private subnet, if present | 10.0.128.0/20 |
| Public route table | local; 0.0.0.0/0 → IGW |
| Private route table | local; no direct IGW route |

These CIDRs match the team screenshots; do not change existing infrastructure to match the report. In Your VPCs → select the VPC → Resource map, verify subnet and route associations. For EC2 metric delivery, verify outbound connectivity to the relevant AWS services or appropriate endpoints; do not open inbound ports just to publish metrics.

**Evidence:** Resource map, route-table associations and attached Internet Gateway.


## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

VPC → Your VPCs → netmon-vpc → Resource map. Check the IPv4 CIDR and subnet/route-table associations.

{{< photo src="workshop/aws-console/06-netmon-vpc-resource-map.png" alt="VPC → Your VPCs → netmon-vpc → Resource map. Check the IPv4 CIDR and subnet/route-table associations." caption="Configuration evidence from the team." >}}

### Step 2

VPC → Subnets → select the public subnet; check 10.0.0.0/20, us-east-1a, and public route table.

{{< photo src="workshop/aws-console/08-public-subnet-details.png" alt="VPC → Subnets → select the public subnet; check 10.0.0.0/20, us-east-1a, and public route table." caption="Configuration evidence from the team." >}}

### Step 3

Select the private subnet; verify 10.0.128.0/20 and Auto-assign public IPv4 address = No.

{{< photo src="workshop/aws-console/09-private-subnet-details.png" alt="Select the private subnet; verify 10.0.128.0/20 and Auto-assign public IPv4 address = No." caption="Configuration evidence from the team." >}}

### Step 4

Internet gateways → netmon IGW: verify Attached status and associated VPC.

{{< photo src="workshop/aws-console/14-netmon-igw-details.png" alt="Internet gateways → netmon IGW: verify Attached status and associated VPC." caption="Configuration evidence from the team." >}}

### Step 5

Route tables → netmon-rtb-public → Routes: verify local and 0.0.0.0/0 → IGW.

{{< photo src="workshop/aws-console/11-netmon-rtb-public-routes.png" alt="Route tables → netmon-rtb-public → Routes: verify local and 0.0.0.0/0 → IGW." caption="Configuration evidence from the team." >}}

### Step 6

Private route table → Routes and Subnet associations: check the local route and absence of a direct IGW route.

{{< photo src="workshop/aws-console/13-netmon-rtb-private1-us-east-1a-routes.png" alt="Private route table → Routes and Subnet associations: check the local route and absence of a direct IGW route." caption="Configuration evidence from the team." >}}

**Related interface screenshots:** [AWS architecture and network topology](../../#netmon-topology).
