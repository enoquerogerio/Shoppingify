package com.whoami.Shoppingify.repositories;

import com.whoami.Shoppingify.domain.shoppingList.ShoppingList;
import com.whoami.Shoppingify.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, String> {
    List<ShoppingList> findByUserId(String userId);

    Optional<ShoppingList> findByUserAndStatus(User user, ShoppingList.ListStatus listStatus);

    List<ShoppingList> findByUserAndStatusNot(User user, ShoppingList.ListStatus listStatus);
}
