package com.example.finance.service;

import com.example.finance.model.*;
import com.example.finance.repository.UserRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public void addTransaction(String email, Transaction transaction) {
        User user = userRepo.findByEmail(email);
        if (user == null) throw new RuntimeException("User not found");

        user.addTransaction(transaction);
        userRepo.save(user);
    }
}
