CREATE TABLE test_tbl(
  id serial primary key,
  name varchar(30);
);

CREATE TABLE tbl_sslist(
  ssKey serial primary key,
  ssTitle varchar(30),
  ssContent varchar(200),
  ssCreateDate timestamp,
  ssUpdateDate timestamp,
  ssIsChecked boolean,
  ssIsDeleted boolean
);

https://www.youtube.com/watch?v=ldYcgPKEZC8

https://recordboy.github.io/2020/11/05/express-react-heroku-init/