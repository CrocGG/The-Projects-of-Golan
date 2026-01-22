import type ReviewModel from "./ReviewModel";

// TYPESCRIPT INTERFACE: Defines the structure/shape of a Product object
// WHY: Type safety - ensures all product objects have the required properties with correct types
// BENEFITS: IntelliSense autocomplete, compile-time error checking, better code documentation
export default interface ProductModel {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    reviews: ReviewModel[];
    images: string[];
}