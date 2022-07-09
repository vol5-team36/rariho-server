import { Stack, StackProps } from "aws-cdk-lib";
import {
  AmazonLinuxEdition,
  AmazonLinuxGeneration,
  AmazonLinuxImage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISecurityGroup,
  IVpc,
  Peer,
  Port,
  Protocol,
  SecurityGroup,
  UserData,
  AmazonLinuxCpuType,
} from "aws-cdk-lib/aws-ec2";
import {
  Effect,
  IRole,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { readFileSync } from "fs";
import { config } from "./env";
import { KeyPair } from "cdk-ec2-key-pair";

export interface Ec2Props extends StackProps {
  vpc: IVpc;
}

export class Ec2Stack extends Stack {
  public readonly ec2: Instance;
  private readonly securityGroup: ISecurityGroup;
  private readonly role: IRole;

  constructor(scope: Construct, id: string, props: Ec2Props) {
    super(scope, id, props);

    this.securityGroup = this.createEc2SecurityGroup(props.vpc);
    this.role = this.createEc2ImaRole();
    const userData = UserData.forLinux({ shebang: "#!/bin/bash" });
    const script = readFileSync("./data/userdata.sh", { encoding: "utf8" });
    userData.addCommands(...script.split("\n"));

    // Create a key pair to be used with this EC2 Instance
    const key = new KeyPair(this, "KeyPair", {
      name: config.project_name + "-key-pair",
      description:
        "Key Pair for " + config.project_name + " created with CDK Deployment",
    });
    key.grantReadOnPublicKey;

    for (let i = 0; i < 3; i++) {
      this.ec2 = new Instance(this, "Ec2Instance-" + i, {
        vpc: props.vpc,
        instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
        machineImage: new AmazonLinuxImage({
          edition: AmazonLinuxEdition.STANDARD,
          generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
          cpuType: AmazonLinuxCpuType.X86_64,
        }),
        keyName: key.keyPairName,
        vpcSubnets: { subnets: [props.vpc.publicSubnets[0]] },
        securityGroup: this.securityGroup,
        role: this.role,
        userData: userData,
      });
    }
  }

  private createEc2SecurityGroup(vpc: IVpc): ISecurityGroup {
    const securityGroup = new SecurityGroup(this, "Ec2SecurityGroup", {
      vpc,
    });

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), Protocol.TCP);
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80), Protocol.TCP);
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(443), Protocol.TCP);
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(27017), Protocol.TCP);

    return securityGroup;
  }

  private createEc2ImaRole(): IRole {
    const imaRole = new Role(this, "Ec2ImaRole", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
    });

    imaRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "ec2:DescribeTags",
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket",
          "s3:ListAllMyBuckets",
          "cloudwatch:PutMetricData",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams",
          "logs:DescribeLogGroups",
          "logs:CreateLogStream",
          "logs:CreateLogGroup",
          "ssm:PutParameter",
          "ssm:GetParameter",
        ],
        resources: ["*"],
      })
    );

    return imaRole;
  }
}
