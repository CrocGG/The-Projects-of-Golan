import { configureStore } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";
import { productSlice } from "./ProductSlice";

// AppState defines the shape of our entire application state
export type AppState = {
    products: ProductModel[]; // Global products array accessible by all components
};

// STORE CREATION: Combines all reducers into a single store
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer, // Links the products slice to the store
    },
});



