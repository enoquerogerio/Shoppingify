package com.whoami.Shoppingify.domain.shoppingList;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.whoami.Shoppingify.domain.listItem.ListItem;
import com.whoami.Shoppingify.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@Table(name = "shopping_lists")
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private ListStatus status;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ListItem> items;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;
    public enum ListStatus {
        ACTIVE, COMPLETED, CANCELLED
    }
}
