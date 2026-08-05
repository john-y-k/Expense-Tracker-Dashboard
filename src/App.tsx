import type { Expense } from "./types/expense";
import { useState } from "react";
import { categories } from "./constants/categories";
import { Header } from "./components/Header";
import { ExpenseForm } from "./components/ExpenseForm";
import { Dashboard } from "./components/Dashboard";
import { useExpenses } from "./hooks/useExpenses";
import { sortExpenses } from "./utils/sortExpenses";
import { filterExpenses } from "./utils/filterExpenses";
import { FilterControls } from "./components/FilterControls";
import { Transactions } from "./components/Transactions";

import "./styles/app.css"
import "./styles/filter-controls.css"
import "./styles/dashboard.css"
import "./styles/table.css"
import "./styles/expense-form.css"
import "./styles/banner.css"
import "./styles/transactions.css"


function App() {
    // calls useExpenses to use localStorage for list of expenses
    const [expenses, setExpenses] = useExpenses();

    // addExpense function to add a new expenseItem to the list
    const addExpense = (expense: Expense) => {
        setExpenses(prev => [...prev, expense]);
    };

    // importExpenses function to import CSV file of expenses
    const importExpenses = (newExpenses: Expense[]) => {
        setExpenses(prev => [
            ...prev,
            ...newExpenses
        ]);
    };

    // removeExpense function to remove an expenseItem from the list
    const removeExpense = (id: number) => {
        setExpenses(prev =>
            prev.filter(expense => expense.id !== id)
        );
    };

    // editExpense function to edit an expenseItem from the list
    const editExpense = (updatedExpense: Expense) => {
        setExpenses(prev =>
            prev.map(exp =>
                exp.id === updatedExpense.id ? updatedExpense : exp
            )
        );
    };

    // filtering Expenses by category
    const [filter, setFilter] = useState("All");
    const filteredExpenses = filterExpenses(expenses, filter)

    // sorting Expenses by option
    const [sortBy, setSortBy] = useState("date");
    const sortedExpenses = sortExpenses(filteredExpenses, sortBy);


    return(
        <div className="app">
            <Header />
            
            {/* Filtering ExpenseItem by their category*/}
            <FilterControls
                filter={filter}
                categories={categories}
                onFilterChange={setFilter}
            />

            {/* dashboard with all the Cards and Graphs */}
            <Dashboard expenses={filteredExpenses} filter={filter}/>

            {/* ExpenseForm to add new ExpenseItem to the ExpenseList */}
            <ExpenseForm onAddExpense={addExpense} />

            <Transactions
                expenses={expenses}
                sortedExpenses={sortedExpenses}
                sortBy={sortBy}
                onSortChange={setSortBy}
                removeExpense={removeExpense}
                editExpense={editExpense}
                importExpenses={importExpenses}
            />
        </div>
    );
}

export default App
