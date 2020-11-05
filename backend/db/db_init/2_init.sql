CREATE TABLE template
(
    id int
    auto_increment not null primary key, 
    uri VARCHAR
    (256),
    name VARCHAR
    (64),
    createat DATETIME DEFAULT CURRENT_TIMESTAMP
);

    INSERT INTO template
        (uri, name)
    VALUES
        ('uri', 'sample_00');