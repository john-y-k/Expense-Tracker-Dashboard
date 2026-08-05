import { useState } from "react";
import type { Expense } from "../types/expense";
import { categories } from "../constants/categories";


type ExpenseFormProps = {
    onAddExpense: (expense: Expense) => void;
}

export function ExpenseForm( { onAddExpense }: ExpenseFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(categories[0])
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (description.trim() == "") {
            alert("Please enter a description.");
            return;
        }

        if (Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }


        const newExpense: Expense = {
            id: Date.now(), /* TEMPORARY PLACEHOLDER USING "Date.now()"; will have ot update with UUID or backend ID later */
            description,
            amount: Number(amount),
            category,
            date
        };

        onAddExpense(newExpense);
    
        // reset form
        setDescription("");
        setAmount("");
        setCategory(categories[0]);
        setDate("");
    };

    return (
        <div className="expense-form-card">
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit} className="expense-form">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}