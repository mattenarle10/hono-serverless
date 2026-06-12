import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2'
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const honoFunction = new NodejsFunction(this, 'HonoFunction', {
      entry: 'src/handler.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_24_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node24',
      },
    })

    const honoIntegration = new integrations.HttpLambdaIntegration(
      'HonoIntegration',
      honoFunction
    )

    const api = new apigateway.HttpApi(this, 'HttpApi', {
      defaultIntegration: honoIntegration,
      corsPreflight: {
        allowHeaders: ['content-type', 'authorization'],
        allowMethods: [
          apigateway.CorsHttpMethod.GET,
          apigateway.CorsHttpMethod.POST,
          apigateway.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: ['*'],
      },
    })

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url!,
    })
  }
}
