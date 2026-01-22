import './SearchBar.css'

interface SearchBarProps {
    onSearch(searchTerm: string): void
}

export default function SearchBar(props: SearchBarProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(e.target.value)
    }

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
