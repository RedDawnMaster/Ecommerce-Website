package com.ecommercebackend.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);

    List<User> findByUsernameContains(String username);

    List<User> findByEmailContains(String email);

    List<User> findByRole(String role);

    int deleteByUsername(String username);
}
