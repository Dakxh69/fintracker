package com.example.finance.report;

import com.example.finance.model.*;
import java.time.LocalDate;
import java.util.*;

public class YearlyReport implements Report {
    public void generate(List<Transaction> transactions) {
        System.out.println("\n=== Yearly Report ===");
        double totalIncome = 0, totalExpense = 0;
        int year = LocalDate.now().getYear();

        for (Transaction t : transactions) {
            if (t.getDate().getYear() == year) {
                System.out.println(t.getDetails());
                if (t instanceof Income) totalIncome += t.getAmount();
                else if (t instanceof Expense) totalExpense += t.getAmount();
            }
        }

        System.out.println("\nTotal Income: " + totalIncome);
        System.out.println("Total Expense: " + totalExpense);
        System.out.println("Net Savings: " + (totalIncome - totalExpense));
    }
}
