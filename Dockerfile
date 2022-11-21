FROM node:16

COPY . .

RUN npm install -g npm@9.1.2
# EXPOSE 3000
CMD ["cd aict-PERN/aict-site-w-react && npm", "start"]
