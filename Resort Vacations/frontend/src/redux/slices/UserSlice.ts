import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../models/User";

export default function initializeUsers(_currentState: UserModel[], action: PayloadAction<UserModel[]>): UserModel[] {
    return action.payload;
}

export function createUser(currentState: UserModel[], action: PayloadAction<UserModel>): UserModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

export const userSlice = createSlice({
    name: "users",
    initialState: [] as UserModel[],
    reducers: { initializeUsers, createUser }
});

export const userActions = userSlice.actions;
