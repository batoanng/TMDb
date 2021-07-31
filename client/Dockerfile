FROM node:alpine

ENV TZ='Asia/Bangkok'
RUN sh -c "ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone"

WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install --only=production
COPY . .

CMD ["npm", "run", "dev"]