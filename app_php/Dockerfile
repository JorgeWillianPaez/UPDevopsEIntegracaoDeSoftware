FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y nginx curl unzip

COPY ./ /var/www/html

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["sh", "-c", "service nginx start && php-fpm"]