FROM httpd:2.4
COPY config/000-default.conf /usr/local/apache2/conf/httpd.conf
COPY config/.htaccess /var/www/html/.htaccess
ADD dist/ /var/www/html/
