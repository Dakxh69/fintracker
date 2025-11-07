package com.example.finance.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public abstract class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String description;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private Category category;

    // === Link to User ===
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction() {}

    public Transaction(double amount, String description, Category category, LocalDate date) {
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.date = date;
    }

    public Long getId() { return id; }
    public double getAmount() { return amount; }
    public String getDescription() { return description; }
    public LocalDate getDate() { return date; }
    public Category getCategory() { return category; }
    public User getUser() { return user; }

    public void setAmount(double amount) { this.amount = amount; }
    public void setDescription(String description) { this.description = description; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setCategory(Category category) { this.category = category; }
    public void setUser(User user) { this.user = user; }

    public abstract String getType();

    public String getDetails() {
        return String.format("%s | %s | %.2f | %s", date, category, amount, description);
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %.2f | %s", date, category, amount, description);
    }
}
