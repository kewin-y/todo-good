CREATE DATABASE todos;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    summary VARCHAR(255),
    completed boolean,
);
