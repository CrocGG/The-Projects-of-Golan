import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import SignUp from "../../pages/sign-up/SignUp";
import NotFound from "../../pages/not-found/NotFound";

export default function EntranceRouting() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
