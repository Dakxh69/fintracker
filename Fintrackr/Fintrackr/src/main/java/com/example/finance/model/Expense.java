package com.example.finance.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("EXPENSE")
public class Expense extends Transaction {

    public Expense() {}

    public Expense(double amount, String description, Category category, LocalDate date) {
        super(amount, description, category, date);
    }

    @Override
    public String getType() {
        return "Expense";
    }
}
