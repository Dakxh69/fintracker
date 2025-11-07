package com.example.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class FinanceAppSpring {
    public static void main(String[] args) {
        SpringApplication.run(FinanceAppSpring.class, args);
    }
}
