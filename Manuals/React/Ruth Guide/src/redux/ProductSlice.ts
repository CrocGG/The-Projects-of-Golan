import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";

// Init entire Products once: 
export default function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    return action.payload;
}

// Add Product to global state: 
export function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Product in global state: 
export function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload.id); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState[index] = action.payload; // Update - replace old Product with given Product.
    return newState;
}

// Delete Product from global state: 
export function deleteProduct(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    const newState = [...currentState]; // Duplicate current state.
    const index = newState.findIndex(p => p.id === action.payload); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState.splice(index, 1); // Delete given Product.
    return newState; // Return the new state.
}

export const productSlice = createSlice({
    name: "products",
    initialState: [] as ProductModel[],
    reducers: { initProducts, addProduct, updateProduct, deleteProduct }
});


export const productActions = productSlice.actions;