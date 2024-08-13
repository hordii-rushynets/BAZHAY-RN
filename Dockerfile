# Вибір базового образу
FROM node:18-buster

# Встановлення зависимостей для yarn
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg

# Додавання репозиторію Yarn і ключів
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Встановлення Yarn
RUN apt-get update && \
    apt-get install -y yarn

# Встановлення Expo CLI глобально
RUN yarn global add expo-cli

# Встановлення watchman (необхідний для гарячого перезавантаження в React Native)
RUN apt-get install -y --no-install-recommends \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Налаштування робочої директорії
WORKDIR /app

# Копіювання файлів для установки залежностей
COPY package.json yarn.lock ./
RUN yarn install

# Копіювання решти файлів проекту
COPY . .
