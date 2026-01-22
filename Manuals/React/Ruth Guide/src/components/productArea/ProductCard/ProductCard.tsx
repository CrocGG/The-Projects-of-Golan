import type ProductModel from '../../../models/ProductModel'
import { productService } from '../../../services/ProductService'
import './ProductCard.css'

interface ProductCardProps {
    productCard: ProductModel
    isDelete?: boolean
    onDelete?(deletedProduct: ProductModel): void
}

const StarRating = ({ rating }: { rating: number }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="star star-full">★</span>)
    }

    if (hasHalfStar) {
        stars.push(<span key="half" className="star star-half">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="star star-empty">☆</span>)
    }

    return <div className="star-rating">{stars}</div>
}

export default function ProductCard(props: ProductCardProps) {
    const { productCard, isDelete, onDelete } = props

    const handleDelete = async () => {
        try {
            // REDUX INTEGRATION: ProductService.deleteProduct() automatically updates the Redux store
            // WHY: No need to manually update component state - Redux handles global state management
            // FLOW: 1) Call service → 2) Service updates Redux store → 3) All components get updated automatically
            const deletedProduct = await productService.deleteProduct(productCard.id)
            
            // CALLBACK: Still notify parent component for immediate UI feedback (filtering, etc.)
            // WHY: Parent may need to update local filtered lists before Redux state propagates
            // NOTE: DummyJSON API returns the full deleted product. For APIs that return only { success: true },
            // you would pass the original product instead: onDelete?.(deletedProduct)
            onDelete?.(deletedProduct); 
            console.log('Product deleted:', deletedProduct);

        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <article className="product-card">
            <div className="product-image-container">
                <img
                    src={productCard.images[0]}
                    alt={productCard.title}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-category-badge">
                    {productCard.category}
                </div>
            </div>

            <div className="product-content">
                <div className="product-header">
                    <h3 className="product-title">{productCard.title}</h3>
                    <div className="product-rating">
                        <StarRating rating={productCard.rating} />
                        <span className="rating-value">({productCard.rating})</span>
                    </div>
                </div>

                <p className="product-description">{productCard.description}</p>

                <div className="product-footer">
                    <div className="product-price-container">
                        <span className="product-price">${productCard.price.toFixed(2)}</span>
                        <span className="product-stock">
                            {productCard.stock > 0 ? `${productCard.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <button className="view-details-button" disabled={productCard.stock === 0} >
                        View Details
                    </button>

                    {isDelete && (
                        <button className="delete-button" onClick={handleDelete} >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}
