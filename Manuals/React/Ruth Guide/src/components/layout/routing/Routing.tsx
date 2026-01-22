import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/Products";
import AddProduct from "../../productArea/AddProduct/AddProduct";
import EditProduct from "../../productArea/EditProduct/EditProduct";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
    )
}
