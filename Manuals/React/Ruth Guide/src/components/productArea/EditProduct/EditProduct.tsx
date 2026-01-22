import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './EditProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';

export default function EditProduct() {
    
    const { register, handleSubmit, reset, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Get products from Redux store using standard useSelector
    const products = useSelector((state: AppState) => state.products);

    useEffect(() => {
        if (id) {
            loadProduct(+id);
        }
    }, [id, products]); // products dependency to reload when Redux state changes

    async function loadProduct(productId: number) {
        try {
            // OPTIMIZATION: First check if product exists in Redux store
            const existingProduct = products.find(p => p.id === productId);
            
            let product: ProductModel;
            
            if (existingProduct) {
                // REDUX ADVANTAGE: Use cached data from global store
                console.log('Loading product from Redux store (cached)');
                product = existingProduct;
            } else {
                // FALLBACK: Load from API if not in store (e.g., direct URL access)
                console.log('Loading product from API (direct access)');
                product = await productService.getProductById(productId);
            }
            
            // FORM POPULATION: Set form values regardless of data source
            setValue('title', product.title);
            setValue('description', product.description);
            setValue('category', product.category);
            setValue('price', product.price);
            setValue('rating', product.rating);
            setValue('stock', product.stock);
        } catch (error) {
            console.error('Error loading product:', error);
        }
    }

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Updating:', data);
            
            if (id) {
                // REDUX INTEGRATION: ProductService.editProduct() automatically updates the Redux store
                const updatedProduct = await productService.editProduct(+id, data);
                console.log('Updated:', updatedProduct);
            }
            
            reset();
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='EditProduct'>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='edit-product-btn'>Update Product</button>
                </div>
            </form>
        </div>
    )
}
