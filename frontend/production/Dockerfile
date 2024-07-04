FROM node:20-alpine as node

# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app    

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install all dependencies
RUN npm i        

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile code to js
RUN npm run build    

# ===== Final stage =====

FROM node AS final

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# # Install PM2
RUN npm i -g serve

# Copy package.json and package-lock.json
COPY package*.json ./

# Install libraries as user node
RUN npm i --only=production

# Switch to user node
USER node

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/build ./build

# Open desired port
EXPOSE 3001

# # Use js files to run the application
# ENTRYPOINT ["pm2-runtime", "./process.yml"]  

CMD ["serve", "-s", "build", "-l", "3001"]