CREATE TABLE IF NOT EXISTS items(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    note TEXT,
    img_url VARCHAR(255),
    category_id VARCHAR(255),
    CONSTRAINT item_category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE
)