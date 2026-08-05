import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

// register chart pieces
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    data: { month: string; total: number }[];
};

export function MonthlyBarChart({ data }: Props) {
    const chartData = {
        labels: data.map(d => d.month),
        datasets: [
            {
                label: "Monthly Spending",
                data: data.map(d => d.total),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderRadius: 6
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: "Monthly Spending Overview"
            }
        }
    };

    return <Bar data={chartData} options={options} />;
}