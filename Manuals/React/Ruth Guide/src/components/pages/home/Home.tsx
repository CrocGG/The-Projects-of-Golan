import { useEffect, useState } from 'react';
import './Home.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';

export default function Home() {
    const [randomProduct, setRandomProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRandomProduct();
    }, [])

    async function fetchRandomProduct() {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedProducts = await productService.getProducts();
            if (fetchedProducts.length > 0) {
                const randomIndex = Math.floor(Math.random() * fetchedProducts.length);
                const randomProduct = fetchedProducts[randomIndex];
                setRandomProduct(randomProduct);
            } else {
                setError('No products available');
            }
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="home">
            <div className="content">
                <div className="left">
                    <h1 className="title">Welcome to our store</h1>
                    <p className="subtitle">Discover amazing products</p>
                    <div className="buttons">
                        <button className="shop-btn">Shop Now</button>
                        <button 
                            className="refresh-btn"
                            onClick={fetchRandomProduct}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'New Product'}
                        </button>
                    </div>
                </div>
                
                <div className="right">
                    {error ? (
                        <div className="error">
                            <p>{error}</p>
                            <button onClick={fetchRandomProduct}>Try Again</button>
                        </div>
                    ) : isLoading ? (
                        <div className="loading">Loading...</div>
                    ) : randomProduct ? (
                        <ProductCard productCard={randomProduct} />
                    ) : null}
                </div>
            </div>
        </main>
    )
}
