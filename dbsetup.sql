create table if not exists sweebData
(
	id varchar(30) default '000' null,
    category text null,
    nsfw boolean default 0,
    dateAdded date,
    fileLink text null
);
create table if not exists sweebAPI
(
	id varchar(30) default '000' null,
    apiToken text null
);
INSERT INTO sweebData (id, category, nsfw, dateAdded, fileLink) VALUES (46133452143714, "Pat", false, STR_TO_DATE('2021-01-29', '%Y-%m-%d'), "https://tenor.com/MLKi.gif")