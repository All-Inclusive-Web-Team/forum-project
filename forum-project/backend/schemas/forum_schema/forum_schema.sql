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
    date TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    filename VARCHAR(255) DEFAULT NULL
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
