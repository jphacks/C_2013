CREATE TABLE template
(
    id int
    auto_increment not null primary key, 
    uri VARCHAR
    (256),
    name VARCHAR
    (64)
);

    INSERT INTO template
        (uri, name)
    VALUES
        ('sample_00', 'hogehoge');