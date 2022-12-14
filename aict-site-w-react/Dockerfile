FROM node:16
# react site
COPY .. .
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@9.1.2
RUN npm install react-scripts
EXPOSE 3000
CMD ["npm", "start"]