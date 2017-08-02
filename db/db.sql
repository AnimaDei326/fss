DROP TABLE IF EXISTS regions, countries, users, likes, records, facts;

CREATE TABLE countries(
    id INTEGER NOT NULL AUTO_INCREMENT,
    country NVARCHAR(50),
    capital NVARCHAR(50),
    id_region INTEGER NOT NULL,
    relation BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE regions(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name NVARCHAR(50),
    PRIMARY KEY (id)
);
CREATE TABLE users(
    id_user INTEGER NOT NULL AUTO_INCREMENT,
    name NVARCHAR(50),
    password NVARCHAR(50),
    PRIMARY KEY (id_user)
);

CREATE TABLE likes(
    id INTEGER NOT NULL AUTO_INCREMENT,
    id_1 INTEGER NOT NULL,
    id_2 INTEGER NOT NULL,
    id_3 INTEGER NOT NULL,
    id_4 INTEGER NOT NULL,
    country_1 NVARCHAR(50),
    country_2 NVARCHAR(50),
    country_3 NVARCHAR(50),
    country_4 NVARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE records(
    id INTEGER NOT NULL AUTO_INCREMENT,
    username NVARCHAR(50),
    city NVARCHAR(50),
    region NVARCHAR(50),
    score INTEGER (4),
    game NVARCHAR(50),
    level_game NVARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE facts(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title_preview NVARCHAR(50),
    img_preview NVARCHAR(50),
    text_preview NVARCHAR(200),
    title_main NVARCHAR(200),
    text_main NVARCHAR(5000),
    PRIMARY KEY (id)
);

INSERT INTO users SET password = "q", name = "admin";
ALTER TABLE countries ADD FOREIGN KEY (id_region) REFERENCES regions(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE likes ADD FOREIGN KEY (id_1) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE likes ADD FOREIGN KEY (id_2) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE likes ADD FOREIGN KEY (id_3) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE likes ADD FOREIGN KEY (id_4) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE CASCADE;