# PARADOX RUN — game + leaderboard server (adapter-node).
#   docker build -t paradox-run .
#   docker run -p 3000:3000 -v paradox-data:/data paradox-run

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: skips Playwright/Capacitor postinstall work the server build doesn't need
RUN npm ci --ignore-scripts
COPY . .
RUN npx svelte-kit sync && npm run build && npm prune --omit=dev --ignore-scripts

FROM node:22-alpine
RUN apk add --no-cache su-exec
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    DATA_DIR=/data \
    BODY_SIZE_LIMIT=256K
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
RUN mkdir -p /data
# platform volumes are often mounted root-owned: fix ownership, then drop to the unprivileged user
COPY --chmod=755 scripts/docker-entrypoint.sh /usr/local/bin/entrypoint
ENTRYPOINT ["entrypoint"]
VOLUME ["/data"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "build"]
