# syntax=docker.io/docker/dockerfile:1

##########################


##########################
# STAGE 0: Base image
##########################
FROM node:22.17.0-alpine AS base

##########################
# STAGE 1: Install dependencies
##########################
FROM base AS deps

ENV http_proxy=http://192.168.192.11:8080 \
    https_proxy=http://192.168.192.11:8080 \
    no_proxy=127.0.0.1,localhost,10.0.0.0/8,192.0.0.0/8

RUN apk add --no-cache libc6-compat

WORKDIR /viewer

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

##########################
# STAGE 2: Build application
##########################
FROM base AS builder

ARG NEXT_PUBLIC_API_IDEE_URL \
    NEXT_PUBLIC_API_IDEE_PLUGINS_URL 
    

ENV http_proxy=http://192.168.192.11:8080 \
    https_proxy=http://192.168.192.11:8080 \
    no_proxy=127.0.0.1,localhost,10.0.0.0/8,192.0.0.0/8 \
    NEXT_PUBLIC_API_IDEE_URL=${NEXT_PUBLIC_API_IDEE_URL} \
    NEXT_PUBLIC_API_IDEE_PLUGINS_URL=${NEXT_PUBLIC_API_IDEE_PLUGINS_URL} \ 
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /viewer

COPY --from=deps /viewer/node_modules ./node_modules
COPY . .

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##########################
# STAGE 3: Final runner with Node + Nginx reverse proxy
##########################
FROM alpine:3.22.1 AS runner

ENV http_proxy=http://192.168.192.11:8080 \
    https_proxy=http://192.168.192.11:8080 \
    no_proxy=127.0.0.1,localhost,10.0.0.0/8,192.0.0.0/8

# Install nginx, Node.js, npm, docker-cli, ssh, sshpass and AWS CLI
RUN apk add --no-cache nginx nodejs npm docker-cli openssh sshpass aws-cli

# Crear usuario jenkins con UID 1002 (para que coincida con Jenkins)
RUN addgroup -g 990 docker && adduser -D -u 9001 -G docker jenkins

# Set working directory
WORKDIR /viewer

# Copy application build output
COPY --from=builder /viewer/public ./public
COPY --from=builder /viewer/.next/standalone ./
COPY --from=builder /viewer/.next/static ./.next/static

# Copy Nginx reverse proxy config
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Set environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Run Node.js server (Next.js)
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]