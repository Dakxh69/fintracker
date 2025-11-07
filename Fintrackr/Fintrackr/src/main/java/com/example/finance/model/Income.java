package com.example.finance.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("INCOME")
public class Income extends Transaction {

    public Income() {}

    public Income(double amount, String description, Category category, LocalDate date) {
        super(amount, description, category, date);
    }

    @Override
    public String getType() {
        return "Income";
    }
}
