import { useState, useEffect } from "react";
import type { Expense } from "../types/expense";
import { defaultExpenses } from "../data/expenses1";

export function useExpenses() {
    // sets up expenses
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        const savedExpenses = localStorage.getItem("expenses");
        
        // if saved data uses it
        if (savedExpenses) {
            return JSON.parse(savedExpenses);
        }
        // otherwise takes default expenses data from data/expenses1.ts
        return defaultExpenses;
    });
    
    // saves current expenses into localStorage
    useEffect(() => {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }, [expenses]);

    // returns updated list of expenses
    return [expenses, setExpenses] as const;
}