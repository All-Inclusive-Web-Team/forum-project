-- This page is for creating functions that will be used by more than one table

-- Adding functions for post_reaction and comment_reaction table
CREATE FUNCTION check_likes_arr_for_duplicates() RETURNS TRIGGER AS $$
BEGIN
  IF array_length(NEW.likes, 1) > 1 AND array_length(NEW.likes, 1) > array_length(OLD.likes, 1) THEN
    IF NEW.likes[1:1] <@ ARRAY[OLD.likes] THEN
      RETURN OLD;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION check_dislikes_arr_for_duplicates() RETURNS TRIGGER AS $$
BEGIN
  IF array_length(NEW.dislikes, 1) > 1 AND array_length(NEW.dislikes, 1) > array_length(OLD.dislikes, 1) THEN
    IF NEW.dislikes[1:1] <@ ARRAY[OLD.dislikes] THEN
      RETURN OLD;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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