import type { Expense } from "../types/expense";

export const defaultExpenses: Expense[] = [
    {
        id: 1,
        description: "Groceries",
        amount: 50,
        category: "Food",
        date: "2026-06-18"
    },
    {
        id: 2,
        description: "Gas",
        amount: 30,
        category: "Transportation",
        date: "2026-06-17"
    },
    {
        id:3,
        description: "Utilities",
        amount: 70,
        category: "Bills",
        date: "2026-05-23"
    },
    {
        id: 4,
        description: "Netflix",
        amount: 15,
        category: "Entertainment",
        date: "2026-05-03"
    },
    {
        id: 5,
        description: "Waterbottle",
        amount: 20,
        category: "Miscellaneous",
        date: "2026-04-27"
    }
];