-- This page is for creating functions for the comment_reaction table

-- for likes array
CREATE FUNCTION switch_value_from_dislikes_cr() RETURNS TRIGGER AS $$
BEGIN
    -- if user id is already in dislikes array, remove from dislikes and prepend to likes, we also check if the
    -- new array has a length of at least one in case for some reason we need to empty the array. I tried to empty
    -- the array without the check and it caused an infinte loop. For what reason, idk.
    IF NEW.likes[1:1] <@ (SELECT dislikes FROM comment_reaction WHERE id = NEW.id) AND array_length(NEW.likes, 1) > 0 THEN
        UPDATE comment_reaction SET dislikes = array_remove(dislikes, NEW.likes[1]) WHERE id = NEW.id;
    END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER switch_value_from_dislikes_cr
AFTER UPDATE OF likes ON comment_reaction
FOR EACH ROW
EXECUTE PROCEDURE switch_value_from_dislikes_cr();

-- for dislikes array 
CREATE FUNCTION switch_value_from_likes_cr() RETURNS TRIGGER AS $$
BEGIN
    -- if user id is already in likes array, remove from likes and prepend to dislikes, we also check if the
    -- new array has a length of at least one in case for some reason we need to empty the array. I tried to empty
    -- the array without the check and it caused an infinte loop. For what reason, idk.
    IF NEW.dislikes[1:1] <@ (SELECT likes FROM comment_reaction WHERE id = NEW.id) AND array_length(NEW.likes, 1) > 0 THEN
        UPDATE comment_reaction SET likes = array_remove(likes, NEW.dislikes[1]) WHERE id = NEW.id;
    END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER switch_value_from_likes_cr
AFTER UPDATE OF dislikes ON comment_reaction
FOR EACH ROW
EXECUTE PROCEDURE switch_value_from_likes_cr();

------------------------------ Common commands used for testing --------------------------------------

------------------------------ to clear comment_reaction arrays---------------------------------------
-- UPDATE comment_reaction SET likes = ARRAY[]::INTEGER[] WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = ARRAY[]::INTEGER[] WHERE comment_id='';

------------------------------ to add test values to comment_reaction likes array---------------------
-- UPDATE comment_reaction SET likes = 3 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 2 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 4 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 5 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 6 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 7 || likes WHERE comment_id='';
-- UPDATE comment_reaction SET likes = 8 || likes WHERE comment_id='';

------------------------------ to add test values to comment_reaction dislikes array------------------
-- UPDATE comment_reaction SET dislikes = 20 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 30 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 40 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 50 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 60 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 70 || dislikes WHERE comment_id='';
-- UPDATE comment_reaction SET dislikes = 80 || dislikes WHERE comment_id='';

------------------------------ if you need to drop the functions or triggers for testing purposes------
-- DROP TRIGGER switch_value_from_dislikes_cr ON comment_reaction;
-- DROP TRIGGER switch_value_from_likes_cr ON comment_reaction;
-- DROP FUNCTION switch_value_from_dislikes_cr;
-- DROP FUNCTION switch_value_from_likes_cr;





