package com.whoami.Shoppingify.repositories;

import com.whoami.Shoppingify.domain.category.Category;
import com.whoami.Shoppingify.domain.item.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {

}
