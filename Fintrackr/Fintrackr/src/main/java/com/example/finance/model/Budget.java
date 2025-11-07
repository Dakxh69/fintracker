package com.example.finance.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "budgets")
public class Budget implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private double limitAmount;
    private double spent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Budget() {}

    public Budget(Category category, double limitAmount) {
        this.category = category;
        this.limitAmount = limitAmount;
        this.spent = 0;
    }

    public void addExpense(double amount) {
        spent += amount;
    }

    public boolean isExceeded() {
        return spent > limitAmount;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public Category getCategory() { return category; }
    public double getLimitAmount() { return limitAmount; }
    public double getSpent() { return spent; }
    public User getUser() { return user; }

    public void setCategory(Category category) { this.category = category; }
    public void setLimitAmount(double limitAmount) { this.limitAmount = limitAmount; }
    public void setSpent(double spent) { this.spent = spent; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return String.format("%s: Spent %.2f / Limit %.2f %s",
                category, spent, limitAmount, isExceeded() ? "(Exceeded!)" : "");
    }
}
