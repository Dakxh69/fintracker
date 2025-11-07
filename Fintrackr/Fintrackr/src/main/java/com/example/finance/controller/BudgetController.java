package com.example.finance.controller;

import com.example.finance.model.*;
import com.example.finance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{userId}")
    public Budget createBudget(@PathVariable Long userId, @RequestBody Budget budget) {
        User user = userRepo.findById(userId).orElseThrow();
        budget.setUser(user);
        return budgetRepo.save(budget);
    }

    @GetMapping("/user/{userId}")
    public List<Budget> getBudgetsByUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return budgetRepo.findByUser(user);
    }
}
