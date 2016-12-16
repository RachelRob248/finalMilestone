DROP DATABASE IF EXISTS score;
CREATE DATABASE score;

\c score;

CREATE TABLE score_table(
  id      SERIAL PRIMARY KEY,
  name   VARCHAR(50) NOT NULL,
  score   INTEGER
);
