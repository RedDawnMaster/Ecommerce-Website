package com.ecommercebackend.ecommerce;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ecommercebackend.ecommerce.models.Cart;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.ProductsToDelete;
import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.services.CartService;
import com.ecommercebackend.ecommerce.services.ProductsToDeleteService;
import com.ecommercebackend.ecommerce.services.StatisticService;
import com.ecommercebackend.ecommerce.services.UserService;

@SpringBootApplication
public class EcommerceApplication {
	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(UserService userService, CartService cartService,
			StatisticService statisticService, ProductsToDeleteService productsToDeleteService) {
		return args -> {

			if (statisticService.findById(1l) == null) {
				Statistic statistic = new Statistic();
				statisticService.save(statistic);
			}
			if (productsToDeleteService.findById(1l) == null) {
				ProductsToDelete productsToDelete = new ProductsToDelete();
				productsToDelete.setProducts(new ArrayList<Product>());
				productsToDeleteService.save(productsToDelete);
			}
			if (userService.findByUsername("admin") == null) {
				User user = new User();
				user.setUsername("admin");
				user.setEmail("admin");
				user.setPassword("123");
				user.setFirstName("admin");
				user.setLastName("admin");
				user.setRole("ADMIN");
				user.setCreationDate(new Date());
				user.setBirthDate(new Date());
				user.setCart(new Cart());
				user = userService.register(user);
				user.getCart().setUser(user);
				cartService.save(user.getCart());
			}
		};
	}

}
