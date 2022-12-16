FROM postgres:15.1-bullseye

ADD forum_schema.sql /docker-endtrypoint-init.d/init.sql

EXPOSE 5432
CMD ["postgres"]