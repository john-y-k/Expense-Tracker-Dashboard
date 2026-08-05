import type { Expense } from "../types/expense";

export function importExpensesCSV(
    file: File,
    onImport: (expense: Expense[]) => void
) {
    const reader = new FileReader();

    reader.onload = (event) => {
        const text = event.target?.result;

        if (typeof text !=="string") return;

        const rows = text.split("\n");

        // Remove header row to access data
        const dataRows = rows.slice(1);

        const expenses: Expense[] = dataRows
            .filter(row => row.trim() !== "")
            .map((row, index) => {
                const [
                    date,
                    description,
                    category,
                    amount
                ] = row.split(",");

            return {
                id: Date.now() + index,
                date,
                description,
                category,
                amount: Number(amount)
            };
            });
        
        onImport(expenses);
    };

    reader.readAsText(file);
}