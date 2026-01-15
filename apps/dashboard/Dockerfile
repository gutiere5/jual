FROM node:24-alpine AS base

# 1. Prune
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=dashboard --docker

# 2. Install
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# 3. Build
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=dashboard...

# 4. Serve with Nginx
FROM nginx:alpine AS runner
COPY --from=installer /app/apps/dashboard/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]