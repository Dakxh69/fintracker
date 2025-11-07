package com.example.finance.report;

import com.example.finance.model.*;
import java.util.*;

public class SummaryReport implements Report {
    public void generate(List<Transaction> transactions) {
        System.out.println("\n=== Summary Report ===");
        double totalIncome = 0, totalExpense = 0;

        for (Transaction t : transactions) {
            if (t instanceof Income) totalIncome += t.getAmount();
            else if (t instanceof Expense) totalExpense += t.getAmount();
        }

        System.out.println("Total Income: " + totalIncome);
        System.out.println("Total Expense: " + totalExpense);
        System.out.println("Net Balance: " + (totalIncome - totalExpense));
    }
}
