import { useContext, useMemo } from "react";
import AuthContext from "../components/auth/AuthContext";
import { jwtDecode } from "jwt-decode";


export function useFirstName() {
    const authContext = useContext(AuthContext);

    const firstName = useMemo(() => {
        const { firstName } = jwtDecode<{ firstName: string }>(authContext!.jwt);
        return firstName;
    }, [authContext]);

    return firstName;
}

export function useLastName() {
    const authContext = useContext(AuthContext);

    const lastName = useMemo(() => {
        const { lastName } = jwtDecode<{ lastName: string }>(authContext!.jwt);
        return lastName;
    }, [authContext]);

    return lastName;
}