import type { Expense } from "../types/expense"
import { SortControls } from "./SortControls"
import { ExpenseList } from "./ExpenseList"
import { exportExpensesCSV } from "../utils/exportCSV"
import { importExpensesCSV } from "../utils/importCSV"
import { useRef } from "react"

type TransactionsProps = {
    expenses: Expense[];
    sortedExpenses: Expense[];
    sortBy: string;
    onSortChange: (sort: string) => void;
    removeExpense: (id: number) => void;
    editExpense: (expense: Expense) => void;
    importExpenses: (expenses: Expense[]) => void;
}

export function Transactions(
    {expenses,
    sortedExpenses,
    sortBy,
    onSortChange,
    removeExpense,
    editExpense,
    importExpenses
}: TransactionsProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportCSV = () => {
        fileInputRef.current?.click();
    };

    return(
            <div className="transactions-card">
                <div className="transactions-header">
                    <h2>Transactions</h2>

                    <div className="transactions-controls">
                        <SortControls
                            sortBy={sortBy}
                            onSortChange={onSortChange}
                        />

                        <button onClick={handleImportCSV}>
                            Import CSV
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    importExpensesCSV(file, importExpenses);
                                }
                            }}
                        />

                        <button onClick={() => exportExpensesCSV(expenses)}>
                            Export CSV
                        </button>
                    </div>
                </div>
                
                {/* Displays ExpenseList of the 'ExpenseItem's */}
                <ExpenseList
                    expenses={sortedExpenses}
                    onDeleteExpense={removeExpense}
                    onEditExpense={editExpense}
                />
            </div>
        )
    }