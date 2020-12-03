create database ejemplo;

create table books(
    section int,
    title text,
    author text
);

insert into books values 
    (2, 'Digital', 'Dan Brown'),
    (3, 'World war z', 'Max Brooks');

create table users(
    username text,
    password text,
    email text
);

insert into users values
    ('joann', 'jodan123', 'joannmurillo81@gmail.com');