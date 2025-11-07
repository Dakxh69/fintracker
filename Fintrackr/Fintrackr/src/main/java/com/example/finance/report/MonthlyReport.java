package com.example.finance.report;

import com.example.finance.model.*;
import java.util.*;
import java.time.*;

public class MonthlyReport implements Report {
    public void generate(List<Transaction> transactions) {
        System.out.println("\n=== Monthly Report ===");
        double totalIncome = 0, totalExpense = 0;

        for (Transaction t : transactions) {
            if (t.getDate().getMonth() == LocalDate.now().getMonth()) {
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
