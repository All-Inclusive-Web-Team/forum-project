CREATE TABLE post (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    post_author VARCHAR(50) NOT NULL,
    post TEXT NOT NULL,
    post_date TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    -- remove this and put switch the foreign key to the post id column
    comment_id BIGSERIAL NOT NULL, 
    -- this is not neccessary
    UNIQUE(comment_id)
);

CREATE TABLE comment (
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    comment_author VARCHAR(50) NOT NULL,
    comment_date TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    comment TEXT NOT NULL,
    comment_id INTEGER REFERENCES post ON DELETE CASCADE NOT NULL,
    comment_parent_id INTEGER REFERENCES comment(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL
);