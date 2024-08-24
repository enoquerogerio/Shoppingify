package com.whoami.Shoppingify.domain.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    @Email(message = "Please enter email in proper format!")
    private String email;

    @Column(nullable = false)
    @Size(min = 5, message = "The password must have at least 5 characters")
    private String password;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

}
