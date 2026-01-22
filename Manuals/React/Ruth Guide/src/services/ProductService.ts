import axios from "axios";
import { appConfig } from "../utils/AppConfig";
import type ProductModel from "../models/ProductModel";
import { productActions } from "../redux/ProductSlice";
import { store } from "../redux/Store";

// SERVICE LAYER PATTERN: Handles all product-related API calls and Redux state updates
// WHY: Separates business logic from UI components - components don't need to know about API details
// BENEFITS: 
// - Centralized API logic (easy to modify endpoints, add error handling, etc.)
// - Automatic Redux state updates (no manual dispatch needed in components)  
// - Reusable across components (multiple components can use the same methods)
// - Easier testing (mock the service instead of individual API calls)
class ProductService {
    public async getProducts(): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}?limit=0`);
        const products = response.data.products;

        const action = productActions.initProducts(products);
        store.dispatch(action);

        return products;
    }

    public async getProductById(productId: number): Promise<ProductModel> {
        const response = await axios.get(`${appConfig.productsUrl}/${productId}`);
        return response.data;
    }

    public async searchProducts(searchTerm: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}/search?q=${searchTerm}`);
        return response.data.products;
    }

    public async sortProducts(sortBy: string, order: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}?sortBy=${sortBy}&order=${order}`);
        return response.data.products;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const response = await axios.post(`${appConfig.productsUrl}/add`, product);

        const action = productActions.addProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async editProduct(productId: number, product: ProductModel): Promise<ProductModel> {
        const response = await axios.put(`${appConfig.productsUrl}/${productId}`, product);

        const action = productActions.updateProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async deleteProduct(productId: number): Promise<ProductModel> {
        const response = await axios.delete(`${appConfig.productsUrl}/${productId}`);

        const action = productActions.deleteProduct(productId);
        store.dispatch(action);
        
        return response.data;
    }

}

export const productService = new ProductService();