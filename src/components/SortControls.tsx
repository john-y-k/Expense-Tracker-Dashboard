import type { ChangeEvent } from "react";

type SortControlsProps = {
    sortBy: string;
    onSortChange: (sort:string) => void;
}

export function SortControls({
    sortBy,
    onSortChange
} : SortControlsProps) {
    return (
        <div className="sort-controls">
            <label>Sort by: </label>

            <select
                value={sortBy}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    onSortChange(e.target.value)
                }
            >
                <option value="date">Newest</option>
                <option value="amount">Highest Amount</option>
                <option value="amountAsc">Lowest Amount</option>
            </select>
        </div>
    );
}
