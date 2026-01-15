FROM node:24-alpine AS base

# 1. Prune the workspace to just what is needed for this app
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=backend --docker

# 2. Install dependencies (using the pruned lockfile)
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# 3. Build the app
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=backend...

# 4. Final production image
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer /app/apps/backend/package.json .
COPY --from=installer /app/apps/backend/dist ./dist
# If you have shared packages referenced in package.json, they might be needed in node_modules
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]