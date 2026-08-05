import { Pie } from "react-chartjs-2";
import type { Expense } from "../types/expense";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseChartProps = {
    expenses: Expense[];
};

export function ExpenseChart({ expenses }: ExpenseChartProps) {
    const categoryTotals = expenses.reduce<Record<string, number>>(
        (acc, expense) => {
            acc[expense.category] =
                (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {}
    );

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4bc0c0",
                    "#9966ff"
                ]
            }
        ]
    };

const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: "bottom" as const
        },

        datalabels: {
            color: "#fff",
            font: {
                weight: "bold" as const
            },
            formatter: (value: number, context: any) => {
                const total = context.chart.data.datasets[0].data.reduce(
                    (a: number, b: number) => a + b,
                    0
                );

                const percent = (value / total) * 100;

                return percent > 5 ? `${percent.toFixed(1)}%` : "";
            }
        }
    }

    
};

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Pie data={data} options={options} />
        </div>
    );
}