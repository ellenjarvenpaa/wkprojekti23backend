DROP DATABASE IF EXISTS dessert;
CREATE DATABASE dessert;
USE dessert;


CREATE TABLE UserLevels (
    user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);


CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_level_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(user_level_id)
);

ALTER TABLE Users AUTO_INCREMENT=1001;

CREATE TABLE Categories (
    category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255)
);

CREATE TABLE Dishes (
    dish_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dish_price DECIMAL(6,2) NOT NULL,
    dish_name VARCHAR(255) NOT NULL,
    dish_photo VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Offers (
    offer_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dish_id INT NOT NULL,
    offer_price DECIMAL(6,2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
);

-- payment_status: 'paid' tai 'unpaid'/ DEFAULT 'unpaid'
-- order_status: 'pending', 'ready', 'picked up' / DEFAULT 'not ready'
CREATE TABLE Orders (
    order_num INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total_amount VARCHAR(255),
    payment_status ENUM('paid', 'unpaid') DEFAULT 'unpaid',
    order_status ENUM('preparing', 'ready', 'picked up') DEFAULT 'preparing',
    created_at TIMESTAMP NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE OrderTicket (
    ticket_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_num INT NOT NULL,
    dish_id INT NOT NULL,
    dish_price DECIMAL(6,2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (order_num) REFERENCES Orders(order_num),
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
);


-- Lisää mock data
INSERT INTO UserLevels(name, description)
VALUES ('super admin', 'kaikki oikeus'),
    ('admin', 'admin hallinta paitsi poista/luoda käyttäjä'),
    ('user', 'normaali käyttäjä');

INSERT INTO Users(email, password, user_level_id)
VALUES ('juuso@gmail.com', 'juuso', 2),
    ('sofia@gmail.com', 'sofia1', 3),
    ('jaska@gmail.com', 'jaska1', 3),
    ('simosimo@gmail.com', 'simosimo', 3),
    ('Jakem@gmail.com', 'jakem', 3),
    ('anni@gmail.com', 'juuso', 1);

INSERT INTO Categories(category_name)
VALUES ('Jäätelöt'), ('Leivonnaiset'), ('Kakut'), ('Kylmät juomat'), ('Kuumat juomat');

INSERT INTO Dishes(dish_name, dish_price, description, category_id, dish_photo)
VALUES('Mango-meloni', 3.5, 'Laktoositon, Gluteeniton', 1),
    ('Vanilja', 3.5, 'Laktoositon, Gluteeniton', 1),
    ('Suklaa', 3.5, 'Laktoositon, Gluteeniton', 1),
    ('Voisilmäpulla', 2.9, 'Tehty omassa leipomossa', 2),
    ('Korvapuusti', 2.9, 'Tehty omassa leipomossa', 2),
    ('Dallaspulla', 2.9, 'Laktoositon', 2),
    ('Pullapitko', 2.9, 'Tehty omassa leipomossa', 2),
    ('Kinuskikakku', 4.5, 'Laktoositon', 3),
    ('Punainen sametti', 4.0, 'Vegaaninen', 3),
    ('Mansikka täytekakku', 4.0, 'Gluteeniton', 3),
    ('Coca-cola', 3.5, 'Halutessa sokeriton', 4),
    ('Fanta', 3.5, 'Halutessa sokeriton', 4),
    ('Sprite', 3.5, 'Halutessa sokeriton', 4),
    ('Americano', 3.5, 'Piristys päivään', 5),
    ('Latte', 3.5, 'Pyydettäessä erikois maitoon', 5),
    ('Mocha', 3.5, 'Pyydettäessä erikois maitoon', 5);

--sale: cocacola, kinuskikakku, mango-meloni, americano, latte
INSERT INTO Offers(dish_id, offer_price, start_date, end_date)
VALUES (1, 2.9, '2023-12-1', '2023-12-31'), (3, 2.9, '2023-12-1', '2023-12-31'), (9, 1.9, '2023-12-1', '2023-12-31'), (12, 2.9, '2023-12-1', '2023-12-31'), (13, 2.9, '2023-12-1', '2023-12-31');

-- ORDER START: 1. 1pulla(dish id 5) first
INSERT INTO Orders (order_status, total_amount, payment_status, user_id)
    VALUES('preparing', 2.9, 'unpaid', 2);
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(1, 5, 2.9, 1);

-- then: 2. add more capacchino (dish id 12)
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(1, 12, 3.5, 1);
-- update Orders (added more item)
----calculate total_amount
SELECT SUM(OrderTicket.quantity * OrderTicket.dish_price) as totalAmount
FROM Orders, OrderTicket
WHERE Orders.order_num = OrderTicket.order_num;
---- 3. update Orders
UPDATE Orders SET total_amount=6.4
WHERE order_num=1;

-- 4. payment is done
UPDATE Orders SET payment_status='paid', order_status='preparing'
WHERE order_num=1;

-- 5. valmis noudettavaksi
UPDATE Orders SET order_status='ready'
WHERE order_num=1;
-- ORDER END HERE

--how about user delete item?

-- Kysely
-- Valitse kakki katergoriat
SELECT category_name FROM Categories;


--Valitse kakki tarjouksen annosten nimet, hinnat ja kuvaus
SELECT Dishes.dish_id, Dishes.dish_name, offer_price, description
FROM Dishes, Offers
WHERE Offers.dish_id=Dishes.dish_id;

-- Valitse kaikki annosten nimet ja niiden ajankohtaiset hinnat sekä normaalihinnat, kuvaus
-- järjestys kategorian id:n mukaan
SELECT Dishes.dish_id, dish_name, IFNULL(Offers.offer_price, dish_price) AS current_price, Offers.offer_price, dish_price, description, category_id
FROM Dishes LEFT JOIN Offers
ON Dishes.dish_id = Offers.dish_id
ORDER BY category_id;


-- Käyttäjä tilaa annoksen, jolla id on 4 ????????? TODO: Miten lisää 2 taululle yhtä aika??
--- INSERT INTO Orders(order_status) VALUES(0);
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(5, 4, 4, 1);

-- Hallitsija muokkaa annoksen tietoa
UPDATE Dishes
SET dish_name = 'Uusi jäätelö nimi', dish_price = 3.9,
    description = 'Uusi jäätelö', category_id = 1
WHERE dish_id = 3;

-- Muokkaa tarjouksen tietoa:
UPDATE Offers
SET offer_price = 1.9 WHERE dish_id = 1;

-- Poista tarjousannos
DELETE FROM Offers
WHERE dish_id = 1;
