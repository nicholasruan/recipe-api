CREATE TABLE recipes (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL
);

INSERT INTO recipes (name)
VALUES  ('lasagna');
