-- This is an empty migration.

ALTER TABLE "User" ADD CONSTRAINT "username_min_length" CHECK (char_length(username)>=3)