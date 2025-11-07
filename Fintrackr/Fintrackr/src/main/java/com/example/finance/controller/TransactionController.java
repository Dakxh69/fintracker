package com.example.finance.controller;

import com.example.finance.model.*;
import com.example.finance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    @PostMapping("/{userId}")
    public Transaction addTransaction(@PathVariable Long userId, @RequestBody Transaction t) {
        User user = userRepo.findById(userId).orElseThrow();
        t.setUser(user);
        if (t.getDate() == null) t.setDate(LocalDate.now());
        return transactionRepo.save(t);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return transactionRepo.findByUser(user);
    }
}
