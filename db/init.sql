drop table if exists client;


CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR
);

insert into client(username, password)
values('austintest1', 'austintest1');

select * from client;