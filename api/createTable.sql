CREATE TABLE Users(
    username VARCHAR(20) PRIMARY KEY,
                 pass VARBINARY(20),
                 salt VARBINARY(20),
                 timeLeft int
);

/* add how ever many major u want*/

CREATE TABLE UserCard(
    username VARCHAR(20),
    cse CHAR,
    ee CHAR,
    info CHAR,
    design CHAR,
    acms CHAR,
    biochem CHAR,
    stat CHAR,
    com CHAR,
    arch CHAR,
    me CHAR,
    foster CHAR,
    psych CHAR,
    phys CHAR,
    math CHAR,
    music CHAR,
    chem CHAR,
    FOREIGN KEY(username) REFERENCES Users(username)

);


CREATE TABLE CardDetail(
    cardName VARCHAR(20),
    intro VARCHAR(20),
    majorDescript VARCHAR(20)
);


