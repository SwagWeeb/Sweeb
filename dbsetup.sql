create table if not exists sweebData
(
	id varchar(30) default '000' null,
    category text null,
    nsfw boolean default 0 not null,
    dateAdded date null,
    fileLink text not null
);