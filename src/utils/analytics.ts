import type { Expense } from "../types/expense";

// flows into Dashboard.tsx

export function getMonthlyTotals(expenses: Expense[]) {
    return expenses.reduce((acc, expense) => {
        const month = new Date(expense.date).toLocaleString("default", {
            month: "short",
            year: "numeric"
        });

        if (!acc[month]) {
            acc[month] = 0;
        }

        acc[month] += expense.amount;

        return acc;
    }, {} as Record<string, number>);
}

export function formatMonthlyData(monthlyTotals: Record<string, number>) {
    return Object.entries(monthlyTotals).map(([month, total]) => ({
        month,
        total
    }));
}

// complete this and send to dashboard
export function getTopCategory(expenses: Expense[]) {
    const categoryTotals: Record<string, number> = {};

    expenses.forEach(expense => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }
    });

    let topCategory = "";
    let maxAmount = 0;

    for (const category in categoryTotals) {
        if (categoryTotals[category] > maxAmount) {
            maxAmount = categoryTotals[category];
            topCategory = category;
        }
    }

    return topCategory;
}