CREATE DATABASE IF NOT EXISTS catalog_menu;
USE catalog_menu;

CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    sort_order INT DEFAULT 0
);

INSERT INTO menu_items (name, parent_id, sort_order) VALUES
('Каталог товаров', NULL, 1),
('Мойки', NULL, 2),
('Фильтры', NULL, 3),
('Ulgran', 2, 1),
('Smth', 2, 2),
('Smth', 2, 3),
('Vigro Mramor', 2, 4),
('Handmade', 2, 5),
('Smth', 2, 6),
('Smth', 2, 7),
('Vigro Glass', 2, 8),
('Ulgran', 3, 1),
('Smth', 3, 2),
('Smth', 3, 3),
('Vigro Mramor', 3, 4);
