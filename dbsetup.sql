create table if not exists sweebData
(
	id varchar(30) default '000' null,
    category text null,
    nsfw boolean default 0,
    dateAdded date,
    fileLink text null
);
INSERT INTO sweebData (id, category, nsfw, dateAdded, fileLink) VALUES (38793678439003, "Pat", false, STR_TO_DATE('1-01-2012', '%d-%m-%Y'), "https://img.com")