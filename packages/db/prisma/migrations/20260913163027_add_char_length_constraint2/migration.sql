-- This is an empty migration.

ALTER TABLE "User" ADD CONSTRAINT "min_password_length" CHECK (char_length(password) >= 5)