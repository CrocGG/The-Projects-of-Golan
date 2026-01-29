import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../../models/Vacation";

export default function initializeVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return action.payload;
}

export function createVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

export function editVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(vacation => vacation.id === action.payload.id); 
    if (index === -1) return currentState; 
    newState[index] = action.payload; 
    return newState;
}

export function annihilateVacation(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    const newState = [...currentState]; 
    const index = newState.findIndex(vacation=> vacation.id === action.payload); 
    if (index === -1) return currentState; 
    newState.splice(index, 1); 
    return newState; 
}

export const vacationSlice = createSlice({
    name: "vacations",
    initialState: [] as VacationModel[],
    reducers: { initializeVacations, createVacation, editVacation, annihilateVacation }
});

export const vacationActions = vacationSlice.actions;
