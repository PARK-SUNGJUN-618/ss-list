CREATE TABLE test_tbl(
  id serial primary key,
  name varchar(30);
);

CREATE TABLE tbl_sslist(
  ssKey serial primary key,
  ssTitle varchar(30),
  ssContent varchar(200),
  ssCreateDate timestamptz,
  ssUpdateDate timestamptz,
  ssIsChecked boolean,
  ssIsDeleted boolean
);

INSERT INTO public.tbl_sslist(
	sstitle, sscontent, sscreatedate, ssupdatedate, ssischecked, ssisdeleted
) VALUES (
  'testTitle', 'testContent', now(), now(), false, false
);


CREATE TABLE tbl_sslist_content(
  ssKey serial primary key,
  ssListKey integer REFERENCES tbl_sslist,
  ssContent varchar(200),
  ssIsChecked boolean,
  ssIsDeleted boolean
);

INSERT INTO public.tbl_sslist_content(
	sslistkey, sscontent, ssischecked, ssisdeleted
) VALUES (
  18, 'testContent1', false, false
);


CREATE TABLE tbl_ssdiary(
  ssKey serial primary key,
  ssOrigContent varchar(10000),
  ssModiContent varchar(10000),
  ssCreateDate timestamptz,
  ssUpdateDate timestamptz,
  ssIsDeleted boolean
);

INSERT INTO public.tbl_ssdiary(
	ssorigcontent, ssmodicontent, sscreatedate, ssupdatedate, ssisdeleted
)	VALUES (
  'ssOrigContentTest', 'ssModiContentTest', now(), now(), false
);


https://www.youtube.com/watch?v=ldYcgPKEZC8

https://recordboy.github.io/2020/11/05/express-react-heroku-init/