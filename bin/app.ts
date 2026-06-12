#!/usr/bin/env bun
import * as cdk from 'aws-cdk-lib'
import { ApiStack } from '../lib/api-stack.js'

const app = new cdk.App()

new ApiStack(app, 'ApiStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
})
