package com.example.finance.util;

import com.example.finance.model.Transaction;
import com.example.finance.model.Expense;
import com.example.finance.model.Income;
import com.example.finance.model.Category;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class TransactionFilter {

    public static List<Transaction> filterByKeyword(List<Transaction> transactions, String keyword) {
        return transactions.stream()
                .filter(t -> t.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    public static List<Transaction> filterByDateRange(List<Transaction> transactions, LocalDate start, LocalDate end) {
        return transactions.stream()
                .filter(t -> (t.getDate().isAfter(start.minusDays(1)) && t.getDate().isBefore(end.plusDays(1))))
                .collect(Collectors.toList());
    }

    public static List<Transaction> filterByType(List<Transaction> transactions, String type) {
        return transactions.stream()
                .filter(t -> (type.equalsIgnoreCase("income") && t instanceof Income)
                        || (type.equalsIgnoreCase("expense") && t instanceof Expense))
                .collect(Collectors.toList());
    }

    public static List<Transaction> filterByCategory(List<Transaction> transactions, Category category) {
        return transactions.stream()
                .filter(t -> t.getCategory() == category)
                .collect(Collectors.toList());
    }
}
