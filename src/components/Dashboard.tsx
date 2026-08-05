import { ExpenseChart } from "./ExpensePieChart";
import type { Expense } from "../types/expense";
import { formatMonthlyTotals, getMonthlyTotals, getTopCategory } from "../utils/analytics";
import { MonthlyBarChart } from "./MonthlyBarChart";
import { Card } from "./Card";

type Props = {
    expenses: Expense[];
    filter: string;
}

export function Dashboard({ expenses, filter }: Props) {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const monthlyTotals = getMonthlyTotals(expenses);
    const orderedData = formatMonthlyTotals(monthlyTotals);
    const topCategory = getTopCategory(expenses);
    
    const formattedTotal = total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    const currentMonth = new Date().toLocaleString("default", {
        month: "short",
        year: "numeric"
    });

    const currentMonthData = orderedData.find(
        m => m.month === currentMonth
    );

    const currentMonthTotal = currentMonthData?.total ?? 0;

    const formattedCurrentMonthTotal = currentMonthTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return (
        <div style={{ padding: "20px" }}>
            {/* Summary Cards */}
            <div className="dashboard-grid">
                <Card title={
                        filter === "All"
                        ? "Total Spent (All Categories)"
                        : `Total Spent (${filter})`
                    }
                    value={formattedTotal}
                />
                <Card title="Number of Transactions" value={expenses.length}/>
                <Card title="Current Month Total" value={formattedCurrentMonthTotal} />
                <Card title="Top Spending Category" value={topCategory} />
            </div>


            {/* Chart */}
            <div className="charts-grid" style={{ marginTop: "20px" }}>
                <div className="chart-box">
                    <ExpenseChart expenses={expenses} />
                </div>
                <div className="chart-box">
                    <MonthlyBarChart data={orderedData} />
                </div>                
            </div>

        </div>
    );
}