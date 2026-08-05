import type { Expense } from "../types/expense";

export function filterExpenses(expenses: Expense[], filter: string) {
    const filteredExpenses =
            filter === "All"
                ? expenses
                : expenses.filter(exp => exp.category === filter);
    return filteredExpenses
}