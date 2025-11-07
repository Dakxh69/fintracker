package com.example.finance.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "goals")
public class Goal implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double targetAmount;
    private double currentAmount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Goal() {}

    public Goal(String name, double targetAmount) {
        this.name = name;
        this.targetAmount = targetAmount;
        this.currentAmount = 0;
    }

    public void addProgress(double amount) {
        this.currentAmount += amount;
    }

    public boolean isAchieved() {
        return currentAmount >= targetAmount;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public double getTargetAmount() { return targetAmount; }
    public double getCurrentAmount() { return currentAmount; }
    public User getUser() { return user; }

    public void setName(String name) { this.name = name; }
    public void setTargetAmount(double targetAmount) { this.targetAmount = targetAmount; }
    public void setCurrentAmount(double currentAmount) { this.currentAmount = currentAmount; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return String.format("%s: %.2f / %.2f (%s)", name, currentAmount, targetAmount,
                isAchieved() ? "Achieved" : "In Progress");
    }
}
