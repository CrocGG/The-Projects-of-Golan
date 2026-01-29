import { useContext, useMemo } from "react";
import AuthContext from "../components/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export function useRoleId() {
    const authContext = useContext(AuthContext);

    const roleId = useMemo(() => {
        const { roleId } = jwtDecode<{ roleId: string }>(authContext!.jwt);
        return roleId;
    }, [authContext]);

    return roleId || null;
}

