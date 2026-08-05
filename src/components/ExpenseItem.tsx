import { useState } from "react";
import type { Expense } from "../types/expense";
import { categories } from "../constants/categories";

type ExpenseItemProps = {
    expense: Expense;
    onDelete: (id: number) => void;
    onEdit: (updatedExpense: Expense) => void;
};

export function ExpenseItem({ expense, onDelete, onEdit }: ExpenseItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date);
    
    const handleSave = () => {
        onEdit({
            id: expense.id,
            date,
            description,
            amount,
            category, 
        });

        setIsEditing(false);
    };
    

    if (isEditing) {
        return (
            <tr>
                <td>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </td>

                <td>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </td>

                <td>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </td>

                <td>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </td>

                <td>
                    <button onClick={handleSave}>
                        Save
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>{new Date(expense.date).toLocaleDateString()}</td>

            <td>{expense.description}</td>

            <td>{expense.category}</td>

            <td>${expense.amount}</td>

            <td>
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>

                <button onClick={() => onDelete(expense.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}