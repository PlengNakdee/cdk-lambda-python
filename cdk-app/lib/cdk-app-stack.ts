import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { StateMachine, Succeed } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { join, resolve } from 'path';

export class CdkAppStack extends Stack {
  private readonly lambdasDir = resolve(__dirname, 'lambdas');
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const calculateFunction = new Function(this, 'CalculateFunction', {
      code: Code.fromAsset(join(this.lambdasDir, 'functions_package.zip')),
      runtime: Runtime.PYTHON_3_9,
      handler: "calculate.handler"
    });

    const stateMachine = new StateMachine(this, 'CalculationMachine', {
      definition: new LambdaInvoke(this, "calculationTask", {
        lambdaFunction: calculateFunction
      }).next(new Succeed(this, "Success"))
    });
  }
}
