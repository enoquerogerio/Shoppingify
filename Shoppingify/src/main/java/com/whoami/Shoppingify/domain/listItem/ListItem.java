package com.whoami.Shoppingify.domain.listItem;

import com.whoami.Shoppingify.domain.item.Item;
import com.whoami.Shoppingify.domain.shoppingList.ShoppingList;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "list_items")
@AllArgsConstructor
@NoArgsConstructor
public class ListItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  String id;

    @ManyToOne
    @JoinColumn(name = "shoppinglist_id", nullable = false)
    private  ShoppingList shoppingList;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(nullable = false)
    private int quantity;

    @Column
    private boolean isPurchased;

}
