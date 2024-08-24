package com.whoami.Shoppingify.domain.item;

import com.whoami.Shoppingify.domain.category.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Entity
@Getter
@Setter
@Table(name = "items")
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  String id;

    @Column(nullable = false)
    private  String name;

    @Column
    private  String note;

    @Column
    private  String image_url;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private  Category category;
}
