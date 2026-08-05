import type { ChangeEvent } from "react";

type FilterControlsProps = {
    filter: string;
    categories: string[];
    onFilterChange: (filter: string) => void;
}

export function FilterControls({
    filter,
    categories,
    onFilterChange,
} : FilterControlsProps) {
    return (
        <div className="filter-controls">
            <label>Filter by category: </label>
            
            <select
                value={filter}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    onFilterChange(e.target.value)
                }
            >
                <option value="All">All</option>

                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}
