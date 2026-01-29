import { useContext } from "react";
import AuthContext from "../components/auth/AuthContext";
import type Awareness from "../utilities/Awareness";

export default function useService<T extends Awareness>(Service: { new(jwt: string): T }): T {
    const authContext = useContext(AuthContext);
    const service = new Service(authContext!.jwt);
    return service;
}