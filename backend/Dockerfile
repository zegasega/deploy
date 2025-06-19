# Base image olarak resmi Node.js imajını kullan
FROM node:18

# Uygulama dizinini oluştur
WORKDIR /app

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Diğer tüm dosyaları kopyala
COPY . .

# Uygulamanın dinleyeceği port (örneğin: 3000)
EXPOSE 3000

# Uygulama başlatma komutu
CMD ["node", "server.js"]
