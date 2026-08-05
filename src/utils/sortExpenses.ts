import type { Expense } from "../types/expense";


export function sortExpenses(
    expenses: Expense[],
    sortBy: string
): Expense[] {
    return [...expenses].sort((a, b) => {
        switch (sortBy) {
            case "amount":
                return b.amount - a.amount;

            case "amountAsc":
                return a.amount - b.amount;

            // default case is sorting by newest date
            case "date":
            default:
                return (
                    new Date(b.date).getTime() -
                    new Date(a.date).getTime()
                );
        }
    });
}