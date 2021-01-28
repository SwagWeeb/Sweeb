create table if not exists sweebData
(
	id varchar(30) default '000' null,
	extension text default '.png' not null,
    category text null,
    nsfw boolean default 0 not null,
    dateAdded date null,
    fileSize varchar(10) default '0MB' null,
    fileName text null,
    fileDir text null,
    cdnLink text not null
);