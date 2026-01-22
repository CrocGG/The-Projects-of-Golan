import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './AddProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import useTitle from '../../../utils/UseTitle';
import useNotyf from '../../../utils/UseNotyf';

export default function AddProduct() {
    const { register, handleSubmit, reset } = useForm<ProductModel>();
    const navigate = useNavigate();
    const { success, error } = useNotyf();
    
    useTitle('Add Product');

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Submitting:', data);
            
            // REDUX INTEGRATION: ProductService.addProduct() automatically updates the Redux store
            // WHY: No manual state management needed - service handles both API call and store update
            // FLOW: 1) Submit form → 2) Service adds to API → 3) Service dispatches addProduct action → 4) Redux store updated
            // BENEFIT: When user navigates back to /products, the new product will already be in the global state
            const newProduct = await productService.addProduct(data);
            console.log('Response:', newProduct);
            
            success('Product added successfully!');
            reset();
            navigate('/products');
        } catch (err) {
            console.error('Error adding product:', err);
            error((err as Error).message || 'Failed to add product');
        }
    }

    return (
        <div className='AddProduct'>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='add-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='add-product-btn'>Add Product</button>
                </div>
            </form>
        </div>
    )
}

