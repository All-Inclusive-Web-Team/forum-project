FROM node:16
# react site
COPY .. .
RUN apt-get install -y ca-certificates
RUN apt-get update -y && apt-get upgrade -y

RUN npm install -g npm@9.1.2
RUN npm install react-scripts
EXPOSE 3000
CMD ["npm", "start"]