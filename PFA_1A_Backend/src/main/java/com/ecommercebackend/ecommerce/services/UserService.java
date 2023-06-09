package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Cart;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.repositories.UserDao;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ProductService productService;
    @Autowired
    private StatisticService statisticService;

    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    private User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    public User findById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    public List<User> findByUsernameContains(String username) {
        if (username.equals("empty"))
            return findByRole("CLIENT");
        return userDao.findByUsernameContains(username);
    }

    public List<User> findByEmailContains(String email) {
        if (email.equals("empty"))
            return findByRole("CLIENT");
        return this.userDao.findByEmailContains(email);
    }

    public List<User> findByRole(String role) {
        return this.userDao.findByRole(role);
    }

    public List<User> findAll() {
        return userDao.findAll();
    }

    @Transactional
    public int deleteByUsername(String username) {
        int num;
        User user = findByUsername(username);
        Statistic statistic = statisticService.findById(1l);
        statistic.setTotalClients(statistic.getTotalClients() - 1);
        statisticService.save(statistic);
        num = cartService.deleteByUserUsername(username);
        if (user.getOrders() != null && user.getOrders().size() != 0)
            num += orderService.deleteByUserUsername(username);
        if (user.getReviews() != null && user.getReviews().size() != 0)
            num += reviewService.deleteByUserUsername(username);
        num += userDao.deleteByUsername(username);
        return num;
    }

    @Transactional
    public User register(User user) {
        if (findByUsername(user.getUsername()) != null || findByEmail(user.getEmail()) != null)
            return null;
        if (user.getRole() == null)
            user.setRole("CLIENT");
        Statistic statistic = statisticService.findById(1L);
        statistic.setTotalClients(statistic.getTotalClients() + 1);
        statisticService.save(statistic);
        user.setCreationDate(new Date());
        user.setCart(new Cart());
        user = userDao.save(user);
        user.getCart().setUser(user);
        cartService.save(user.getCart());
        return user;
    }

    @Transactional
    public int update(User user) {
        User found = findById(user.getId());
        if ((!found.getUsername().equals(user.getUsername()) && findByUsername(user.getUsername()) != null)
                || (!found.getEmail().equals(user.getEmail()) && findByEmail(user.getEmail()) != null))
            return -1;
        if (user.getOrders() == null)
            user.setOrders(found.getOrders());
        if (user.getCart() == null)
            user.setCart(found.getCart());
        if (user.getReviews() == null)
            user.setReviews(found.getReviews());
        userDao.save(user);
        return 1;
    }

    public User login(String email, String password) {
        User user = findByEmail(email);
        if (user == null || !user.getPassword().equals(password))
            return null;
        return user;
    }

    public int addToWishList(String username, String label) {
        User user = findByUsername(username);
        Product product = productService.findByLabel(label);
        if (user.getWishList() == null)
            user.setWishList(new ArrayList<Product>());
        if (user.getWishList().contains(product))
            return -1;
        user.getWishList().add(product);
        userDao.save(user);
        return 1;
    }

    public void removeFromWishList(String username, String label) {
        User user = findByUsername(username);
        Product product = productService.findByLabel(label);
        user.getWishList().remove(product);
        userDao.save(user);
    }
}
