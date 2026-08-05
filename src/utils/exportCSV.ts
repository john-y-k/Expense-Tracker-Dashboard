import type { Expense } from "../types/expense";

export function exportExpensesCSV(expenses: Expense[]) {
    // Header row
    const headers = [
        "Date",
        "Description",
        "Category",
        "Amount"
    ];

    // Convert each expense to a row
    const rows = expenses.map(expense => [
        expense.date,
        expense.description,
        expense.category,
        expense.amount
    ]);

    // Combine header + rows
    const csvContent = [
        headers,
        ...rows
    ]
        .map(row => row.join(","))
        .join("\n");

    // Create file
    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    // Create temporary download link
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download =
        `expenses-${new Date().toISOString().slice(0,10)}.csv`;

    link.click();

    URL.revokeObjectURL(url);
}