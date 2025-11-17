# Use an LTS Node base
FROM node:18-bullseye

# Install required global tools
RUN npm install -g expo-cli@latest

# Create app directory
WORKDIR /app

# Copy package manifests first for better caching
COPY package.json package-lock.json ./

# Install dependencies (use either yarn or npm depending on your project)
RUN npm install

# Copy the rest of the source
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002 8081

# Use a small start script to ensure expo starts on 0.0.0.0
CMD ["sh", "-c", "expo start --tunnel --localhost 0.0.0.0"]
