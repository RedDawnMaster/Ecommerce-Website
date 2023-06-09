package com.ecommercebackend.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.repositories.StatisticDao;

@Service
public class StatisticService {
    @Autowired
    private StatisticDao statisticDao;

    public Statistic findById(Long id) {
        return statisticDao.findById(id).orElse(null);
    }

    public List<Statistic> findAll() {
        return statisticDao.findAll();
    }

    public void save(Statistic statistic) {
        statisticDao.save(statistic);
    }
}
