import { configureStore } from "@reduxjs/toolkit";
import { VacationModel } from "../models/Vacation";
import { vacationSlice } from "./slices/VacationSlice";
import { UserModel } from "../models/User";
import { LikerModel } from "../models/Liker";
import { likerSlice } from "./slices/LikerSlice";
import { userSlice } from "./slices/UserSlice";

export type AppState = {
    vacations: VacationModel[],
    users: UserModel[],
    likers: LikerModel[]
};

export const store = configureStore<AppState>({
    reducer: {
        vacations: vacationSlice.reducer,
        users: userSlice.reducer,
        likers: likerSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>

