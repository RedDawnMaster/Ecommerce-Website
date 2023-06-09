package com.ecommercebackend.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.services.StatisticService;

@RestController
@RequestMapping("api/statistic")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/")
    public Statistic findById() {
        return statisticService.findById(1l);
    }
}
