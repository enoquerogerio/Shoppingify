CREATE TABLE IF NOT EXISTS list_items (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    item_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    isPurchased BOOLEAN,
    shoppinglist_id VARCHAR(255) NOT NULL,
    CONSTRAINT item_id_fk FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT shoppinglist_id_fk FOREIGN KEY (shoppinglist_id) REFERENCES shopping_lists (id) ON DELETE RESTRICT ON UPDATE CASCADE
)