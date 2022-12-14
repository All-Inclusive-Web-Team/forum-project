FROM node:16
# backend
COPY .. .
# Certicate
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@9.1.2
EXPOSE 3001
CMD ["npm", "start"]