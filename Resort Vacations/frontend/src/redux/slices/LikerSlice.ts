import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikerModel } from "../../models/Liker";

export default function initializeLikers(_currentState: LikerModel[], action: PayloadAction<LikerModel[]>): LikerModel[] {
    return action.payload;
}

export function createLiker(currentState: LikerModel[], action: PayloadAction<LikerModel>): LikerModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
} 

export function annihilateLiker(currentState: LikerModel[], action: PayloadAction<string>): LikerModel[] {
    const newState = [...currentState]; 
    const index = newState.findIndex(liker=> liker.vacationId === action.payload); 
    if (index === -1) return currentState; 
    newState.splice(index, 1); 
    return newState; 
}

export const likerSlice = createSlice({
    name: "likers",
    initialState: [] as LikerModel[],
    reducers: { initializeLikers, createLiker, annihilateLiker }
});

export const likerActions = likerSlice.actions;
