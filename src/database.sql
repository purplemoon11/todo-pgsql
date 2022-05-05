CREATE DATABASE todo;

--/c into todo database

CREATE TABLE todoDB(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(225)
);