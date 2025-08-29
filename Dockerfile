# --------- Base Image ---------
FROM node:22.12.0-alpine AS base
WORKDIR /app

# Install system dependencies for Next.js and libsql if needed
RUN apk add --no-cache libc6-compat git

# --------- Install Dependencies ---------
FROM base AS deps
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json yarn.lock* pnpm-lock.yaml* ./

# Install dependencies according to package manager
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "No lockfile found" && exit 1; \
    fi

# --------- Build ---------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
    fi

# --------- Production Image ---------
FROM node:22.12.0-alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nextgroup && adduser --system --uid 1001 nextuser
USER nextuser:nextgroup

# Copy built Next.js output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]
