
GRANT ALL PRIVILEGES ON DATABASE aictforum TO docker_test;

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
    likes INTEGER[] NOT NULL DEFAULT '{}'::INTEGER[],
    dislikes INTEGER[] NOT NULL DEFAULT '{}'::INTEGER[]
);
CREATE TABLE comment_reaction (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    comment_id UUID REFERENCES comment(id) ON DELETE CASCADE NOT NULL,
    likes INTEGER[] NOT NULL DEFAULT '{}'::INTEGER[],
    dislikes INTEGER[] NOT NULL DEFAULT '{}'::INTEGER[]
);
-- This page is for creating functions that will be used by more than one table

-- Adding functions for post_reaction and comment_reaction table
CREATE OR REPLACE FUNCTION check_likes_arr_for_duplicates() RETURNS TRIGGER
AS $$
BEGIN
    IF array_length(NEW.likes, 1) > 1 AND array_length(NEW.likes, 1) > array_length(OLD.likes, 1) THEN
      IF NEW.likes[1:1] <@ ARRAY[OLD.likes] THEN
        RETURN OLD;
      END IF;
    END IF;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_dislikes_arr_for_duplicates() RETURNS TRIGGER
AS $$
BEGIN
  IF array_length(NEW.dislikes, 1) > 1 AND array_length(NEW.dislikes, 1) > array_length(OLD.dislikes, 1) THEN
    IF NEW.dislikes[1:1] <@ ARRAY[OLD.dislikes] THEN
      RETURN OLD;
    END IF;
  END IF;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;
 -- Adding triggers to post_reaction table
 CREATE TRIGGER check_likes_arr_for_duplicates
 BEFORE UPDATE OF likes ON post_reaction
 FOR EACH ROW
 EXECUTE PROCEDURE check_likes_arr_for_duplicates();

 CREATE TRIGGER check_dislikes_arr_for_duplicates
 BEFORE UPDATE OF dislikes ON post_reaction
 FOR EACH ROW
 EXECUTE PROCEDURE check_dislikes_arr_for_duplicates();

 -- Adding triggers to comment_reaction table
 CREATE TRIGGER check_likes_arr_for_duplicates
 BEFORE UPDATE OF likes ON comment_reaction
 FOR EACH ROW
 EXECUTE PROCEDURE check_likes_arr_for_duplicates();

 CREATE TRIGGER check_dislikes_arr_for_duplicates
 BEFORE UPDATE OF dislikes ON comment_reaction
 FOR EACH ROW
 EXECUTE PROCEDURE check_dislikes_arr_for_duplicates();

 -- Adding functions for users table
 CREATE OR REPLACE FUNCTION check_email_for_duplicates() RETURNS TRIGGER
 AS $$
 BEGIN
   IF (SELECT COUNT(*) FROM users WHERE email = NEW.email) > 0 THEN
     RAISE EXCEPTION 'Email % already exists', NEW.email;
   END IF;
   RETURN NEW;
 END;
 $$
 LANGUAGE plpgsql;

 -- Adding trigger to users table
 CREATE TRIGGER check_email_for_duplicates
 BEFORE INSERT ON users
 FOR EACH ROW
 EXECUTE PROCEDURE check_email_for_duplicates();


