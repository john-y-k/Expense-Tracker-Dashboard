import { ExpenseItem } from "./ExpenseItem";
import type { Expense } from "../types/expense";

type ExpenseListProps = {
    expenses: Expense[];
    onDeleteExpense: (id:number) => void;
    onEditExpense: (expense: Expense) => void;
};

export function ExpenseList({ expenses, onDeleteExpense, onEditExpense }: ExpenseListProps) {
    return (
        <div className="expense-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map(expense => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            onDelete={onDeleteExpense}
                            onEdit={onEditExpense}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}