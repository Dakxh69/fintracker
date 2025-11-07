package com.example.finance.report;

import com.example.finance.model.Transaction;
import java.util.List;

public interface Report {
    void generate(List<Transaction> transactions);
}
