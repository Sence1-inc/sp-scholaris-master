FROM node:18-alpine3.18
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]





# # Use the official Node.js Alpine image with version 18 as the base image
# FROM node:18-alpine

# # Install build dependencies needed to compile native modules (better-sqlite3)
# RUN apk add --no-cache python3 make g++ sqlite

# # Set the working directory inside the container
# WORKDIR /app/cms

# # Copy package.json and package-lock.json files to the container
# COPY package*.json ./

# # Install the application dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port that Strapi runs on
# EXPOSE 1337

# # Start the Strapi application
# CMD ["npm", "run", "develop"]
