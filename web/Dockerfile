# Node.js version
FROM node:18

#  Set workdir
WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua file ke container
COPY . .

# Jalankan Server
CMD ["npm", "run", "dev", "--", "--host"]

# Port Server
EXPOSE 5173