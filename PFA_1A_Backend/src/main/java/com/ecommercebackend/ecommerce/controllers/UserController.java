package com.ecommercebackend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.services.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{email}/{password}")
    public User login(@PathVariable String email, @PathVariable String password) {
        return userService.login(email, password);
    }

    @GetMapping("/username/{username}")
    public List<User> findByUsernameContains(@PathVariable String username) {
        return this.userService.findByUsernameContains(username);
    }

    @GetMapping("/email/{email}")
    public List<User> findByEmailContains(@PathVariable String email) {
        return this.userService.findByEmailContains(email);
    }

    @GetMapping("/{role}")
    public List<User> findByRole(@PathVariable String role) {
        return this.userService.findByRole(role);
    }

    @GetMapping("/")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/addToWishList/{username}/{label}")
    public int addToWishList(@PathVariable String username, @PathVariable String label) {
        return userService.addToWishList(username, label);
    }

    @GetMapping("/removeFromWishList/{username}/{label}")
    public void removeFromWishList(@PathVariable String username, @PathVariable String label) {
        userService.removeFromWishList(username, label);
    }

    @DeleteMapping("/{username}")
    public int deleteByUsername(@PathVariable String username) {
        return userService.deleteByUsername(username);
    }

    @PostMapping("/")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PutMapping("/")
    public int update(@RequestBody User user) {
        return userService.update(user);
    }

}
