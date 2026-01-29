import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useAppSelector = useSelector.withTypes<RootState>();
