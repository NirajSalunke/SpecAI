
# syntax=docker/dockerfile:1

# ==========================================
# BASE
# ==========================================
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && corepack prepare pnpm@11.25.0 --activate

WORKDIR /repo


# ==========================================
# DEPENDENCIES
# ==========================================
FROM base AS deps

# Copy workspace manifests first for better caching.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json ./apps/web/package.json

COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install the complete workspace dependency graph.
RUN pnpm install --frozen-lockfile


# ==========================================
# DEVELOPMENT
# ==========================================
FROM deps AS development

COPY . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "exec", "next", "dev", "--hostname", "0.0.0.0"]


# ==========================================
# PRODUCTION BUILD
# ==========================================
FROM deps AS builder

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application.
RUN pnpm --filter web build


# ==========================================
# PRODUCTION RUNTIME
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create an unprivileged runtime user.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy standalone application and dependencies.
COPY --from=builder --chown=nextjs:nodejs \
    /repo/apps/web/.next/standalone ./

# Copy static Next.js assets.
COPY --from=builder --chown=nextjs:nodejs \
    /repo/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
