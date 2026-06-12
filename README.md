# hono-serverless

A small learning repo for building a Hono API on AWS Lambda with AWS CDK.

## Architecture

```txt
Client
  -> Amazon API Gateway HTTP API
  -> AWS Lambda Node.js 24
  -> Hono app
  -> Amazon CloudWatch Logs
```

## Project Shape

```txt
src/app.ts        Hono app composition
src/routes/*      OpenAPI route modules
src/local.ts      local Bun dev server
src/handler.ts    Lambda adapter
src/client.ts     typed Hono RPC client demo
lib/api-stack.ts  API Gateway HTTP API + Lambda
bin/app.ts        CDK entrypoint
```

## Routes

```txt
GET /health   health check
GET /profile  public profile payload
GET /doc      OpenAPI JSON
GET /scalar   Scalar API reference
```

## Setup

```sh
bun install
cp .env.example .env
```

Set `.env` to your local AWS profile and region. Do not put AWS access keys or secrets in this repo.

```txt
AWS_PROFILE=your-aws-profile
AWS_REGION=ap-southeast-1
CDK_DEFAULT_REGION=ap-southeast-1
```

## Local Development

```sh
bun run dev
```

Then open:

```txt
http://localhost:3000/health
http://localhost:3000/profile
http://localhost:3000/scalar
```

Run the typed client demo:

```sh
bun run client
```

To point the client at a deployed API instead of the in-process app:

```sh
API_URL=<ApiUrl> bun run client
```

## Checks

```sh
bun run typecheck
bun test
bun run synth
```

## Deploy

```sh
AWS_PROFILE=your-aws-profile bun run deploy
```

CDK prints an `ApiUrl` output. Test it with:

```sh
curl <ApiUrl>/health
curl <ApiUrl>/profile
curl <ApiUrl>/doc
```

Open the API docs:

```txt
<ApiUrl>/scalar
```

## Cleanup

Destroy the demo stack after testing:

```sh
AWS_PROFILE=your-aws-profile bun run destroy
```

This project is meant to pair with `hono-bun-ecs` for comparing Hono on AWS Lambda versus Bun + Hono on ECS/Fargate.
