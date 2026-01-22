import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type ProductModel from '../../../models/ProductModel';
import './Products.css'
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';
import SearchBar from '../../shared/SearchBar/SearchBar';
import SortBar from '../../shared/SortBar/SortBar';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';
import Loader from '../../shared/loader/Loader';
import useTitle from '../../../utils/UseTitle';

export default function Products() {

    useTitle('Products');
    
    const [loading, setLoading] = useState(false);

    // Local state management - each component manages its own products state
    // const [products, setProducts] = useState<ProductModel[]>([]);

    // WHY: All components can now access the same product data without prop drilling.  When ProductService updates the store, all components automatically get the updates
    const products = useSelector((state: AppState) => state.products); // get products from global store using standard useSelector

    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]); //Filtering logic stays local since it's only used in this component

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                // No need to setProducts() anymore - ProductService updates Redux store directly
                // const fetchedProducts = await productService.getProducts(); 
                // setProducts(fetchedProducts);
                // Just call the service - it will update the Redux store automatically. ProductService.getProducts() already dispatches initProducts action to store
                await productService.getProducts();
                // BENEFIT: Other components can now access products without additional API calls
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []); 

    // Update filtered products when Redux products change. When the global products state changes, we need to update our local filter
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);


    // SERVICE-BASED SEARCH & SORTING: Offload filtering and sorting to the service layer
    async function handleSearchService(searchTerm: string) {
        if (!searchTerm.trim()) {
            setFilteredProducts(products);
            return;
        }

        try {
            const searchResults = await productService.searchProducts(searchTerm);
            setFilteredProducts(searchResults);
        } catch (error) {
            console.error('Search failed:', error);
            setFilteredProducts([]);
        }
    }


    async function handleSortService(sortBy: string, order: string) {
        try {
            const sortedResults = await productService.sortProducts(sortBy, order);
            setFilteredProducts(sortedResults);
        } catch (error) {
            console.error('Sort failed:', error);
        }
    }


    // LOCAL SEARCH & SORTING: Keeping this code commented out for reference

    // function handleSearch(searchTerm: string) {
    //     const filtered = products.filter(product =>
    //         product.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredProducts(filtered);
    // }



    // function handleSort(sortBy: string, order: string) {
    //     const sorted = [...filteredProducts].sort((a, b) => {
    //         let aValue, bValue;

    //         switch (sortBy) {
    //             case 'category':
    //                 aValue = a.category.toLowerCase();
    //                 bValue = b.category.toLowerCase();
    //                 break;
    //             case 'price':
    //                 aValue = a.price;
    //                 bValue = b.price;
    //                 break;
    //             case 'rating':
    //                 aValue = a.rating;
    //                 bValue = b.rating;
    //                 break;
    //             default:
    //                 return 0;
    //         }

    //         if (order === 'asc') {
    //             return aValue > bValue ? 1 : -1; // If aValue > bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: smaller values first → A-Z, 1-10, low-high
    //         } else {
    //             return aValue < bValue ? 1 : -1; // If aValue < bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: larger values first → Z-A, 10-1, high-low
    //         }
    //     });

    //     setFilteredProducts(sorted);
    // }


    function handleDelete(deletedProduct: ProductModel) {
        setFilteredProducts(prevFiltered => prevFiltered.filter(product => product.id !== deletedProduct.id));
    }

    return (
        <div className='Products'>
            <h1 className='products-title'>All Products</h1>

            <div className="products-filter-container">
                <div className="products-filter-left">
                    <SearchBar onSearch={handleSearchService} />
                    <SortBar onSort={handleSortService} />
                </div>
                <Link to='/products/add' className='add-product-link'>+</Link>
            </div>

            {loading && <Loader />}

            <div className="products-container">
                {filteredProducts && filteredProducts.map(product => (
                    <ProductCard key={product.id} productCard={product} isDelete={true} onDelete={handleDelete} />
                ))}
            </div>

        </div>
    )
}
