FROM node:lts

RUN mkdir /app
WORKDIR /app

COPY client/doc-manager/package.json client/doc-manager/package-lock.json /app/
RUN npm ic

ENTRYPOINT ["npm", "start"]
