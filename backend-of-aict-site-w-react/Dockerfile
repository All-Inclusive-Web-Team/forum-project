FROM node:16
# backend
COPY .. .
# Certicate
RUN apt-get install -y ca-certificates
RUN apt-get update -y && apt-get upgrade -y

RUN npm install -g npm@9.1.2
EXPOSE 3001
CMD ["npm", "start"]