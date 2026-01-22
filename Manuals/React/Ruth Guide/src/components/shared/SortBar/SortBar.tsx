import './SortBar.css'

interface SortBarProps {
    onSort(sortBy: string, order: string): void
}

export default function SortBar(props: SortBarProps) {

    function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const [sortBy, order] = e.target.value.split('-')
        props.onSort(sortBy, order)
    }

    return (
        <div className="SortBar">
            <select 
                className="sort-select" 
                onChange={handleSortChange}
                defaultValue=""
            >
                <option value="" disabled>Sort by...</option>
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-desc">Rating (Highest First)</option>
                <option value="rating-asc">Rating (Lowest First)</option>
            </select>
        </div>
    )
}
