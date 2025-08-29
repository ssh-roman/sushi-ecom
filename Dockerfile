# ---------- BASE IMAGE ----------
FROM node:22-bullseye-slim AS base
WORKDIR /app

# Install system dependencies for native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies based on lockfile
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
        echo "No lockfile found" && exit 1; \
    fi

# ---------- BUILD IMAGE ----------
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=base /app/node_modules ./node_modules

# Copy source code
COPY ./src ./src
COPY next.config.mjs ./
COPY public ./public

# Build Next.js
RUN if [ -f yarn.lock ]; then \
        yarn build; \
    elif [ -f package-lock.json ]; then \
        npm run build; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm build; \
    fi

# ---------- PRODUCTION IMAGE ----------
FROM node:22-bullseye-slim AS runner
WORKDIR /app

# Copy build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set environment variables
ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1  # uncomment to disable Next.js telemetry

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]