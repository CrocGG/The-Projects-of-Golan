import { useContext, useMemo } from "react";
import AuthContext from "../components/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export function useCurrentUserId() {
    const authContext = useContext(AuthContext);

    const id = useMemo(() => {
        const { id } = jwtDecode<{ id: string }>(authContext!.jwt);
        return id;
    }, [authContext]);

    return id;
}

