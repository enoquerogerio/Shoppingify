package com.whoami.Shoppingify.repositories;

import com.whoami.Shoppingify.domain.listItem.ListItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListItemRepository extends JpaRepository<ListItem, String> {
}
