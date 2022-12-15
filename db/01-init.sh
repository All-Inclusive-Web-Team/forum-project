#!/bin/bash
set -3
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE aictforum;
  GRANT ALL PRIVILEGES ON DATABASE aictforum TO $APP_DB_USER;
  \connect aictforum $APP_DB_USER
  BEGIN;
  CREATE DATABASE aictforum;
  \c aictforum
  CREATE TABLE users (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL, -- the datatype needs to be changed
      name VARCHAR(100) NOT NULL
  );
  CREATE TABLE post (
      id UUID NOT NULL PRIMARY KEY,
      users_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      author VARCHAR(50) NOT NULL,
      post TEXT NOT NULL,
      date TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
  );
  CREATE TABLE comment (
      id UUID NOT NULL PRIMARY KEY,
      users_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      author VARCHAR(50) NOT NULL,
      date TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
      comment TEXT NOT NULL,
      post_id UUID REFERENCES post(id) ON DELETE CASCADE NOT NULL,
      comment_parent_id UUID REFERENCES comment(id) ON DELETE CASCADE
  );
  CREATE TABLE post_reaction (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      post_id UUID REFERENCES post(id) ON DELETE CASCADE NOT NULL,
      likes INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
      dislikes INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[]
  );
  CREATE TABLE comment_reaction (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      comment_id UUID REFERENCES comment(id) ON DELETE CASCADE NOT NULL,
      likes INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
      dislikes INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[]
  );
  \i procedures/universal_functions.sql
  \i procedures/post_reaction.sql
  \i procedures/comment_reaction.sql
  COMMIT;
EOSQL
