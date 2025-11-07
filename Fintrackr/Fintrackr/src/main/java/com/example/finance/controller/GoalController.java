package com.example.finance.controller;

import com.example.finance.model.*;
import com.example.finance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    @Autowired
    private GoalRepository goalRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{userId}")
    public Goal createGoal(@PathVariable Long userId, @RequestBody Goal goal) {
        User user = userRepo.findById(userId).orElseThrow();
        goal.setUser(user);
        return goalRepo.save(goal);
    }

    @GetMapping("/user/{userId}")
    public List<Goal> getGoalsByUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return goalRepo.findByUser(user);
    }
}
