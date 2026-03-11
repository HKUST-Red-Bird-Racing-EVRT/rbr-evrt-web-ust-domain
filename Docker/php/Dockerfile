# Match your PHP version
FROM php:7.4-apache

# Update package lists and install all system dependencies in one go
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    zip \
    unzip \
    curl \
    libpng-dev \
    libwebp-dev \
    libx11-dev \
    libxpm-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Configure GD for JPEG and FreeType support
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp \
    --with-xpm

# Install all extensions that need to be compiled in a command.
RUN docker-php-ext-install -j"$(nproc)" \
    bcmath \
    bz2 \
    calendar \
    curl \
    dom \
    exif \
    fileinfo \
    ftp \
    gd \
    gettext \
    iconv \
    intl \
    mbstring \
    mysqli \
    pcntl \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    posix \
    shmop \
    simplexml \
    sockets \
    sysvmsg \
    sysvsem \
    sysvshm \
    zip

# Enable opcache, which is usually pre-compiled but disabled by default.
RUN docker-php-ext-enable opcache

# Enable Apache modules
RUN a2enmod rewrite headers deflate

# Copy php.ini (make sure this file exists)
COPY php.ini /usr/local/etc/php/

# Create the exact path structure from your server
RUN mkdir -p /var/www/vhost/rbrevrt/public_html

# Set working directory to match server
WORKDIR /var/www/vhost/rbrevrt/public_html

# Set user ID to match host user for better permission handling
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# Set permissions
RUN chown -R www-data:www-data /var/www/vhost/rbrevrt
