# stage 1
FROM node:21.5.0 as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# stage 2
FROM node:21.5.0 as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# stage 3
FROM node:21.5.0
WORKDIR /app
COPY --from=frontend /app/frontend/build ./frontend/build
COPY --from=backend /app/backend .
RUN npm install
EXPOSE 8000

CMD ["npm", "start"]
