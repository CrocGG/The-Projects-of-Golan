import { VacationModel } from "../models/Vacation";
import { VacationDraftModel } from "../models/VacationDraft";
import { vacationActions } from "../redux/slices/VacationSlice";
import { store } from "../redux/Store";
import Awareness from "../utilities/Awareness";

export default class VacationService extends Awareness {

    public async getVacationsManager(): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-manager`);
        const vacations = response.data;
        const action = vacationActions.initializeVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async getVacationsEvery(): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-normal/vacation-every`);
        const vacations = response.data;
        const action = vacationActions.initializeVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async getVacationsLiked(): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-normal/vacation-liked`);
        const vacations  = response.data;
        const action = vacationActions.initializeVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async getVacationsUpcoming(): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-normal/vacation-upcoming`);
        const vacations = response.data;
        const action = vacationActions.initializeVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async getVacationsActive(): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-normal/vacation-active`);
        const vacations = response.data;
        const action = vacationActions.initializeVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async createVacation(vacation: VacationDraftModel): Promise<VacationModel> {
        const response = await this.axiosInstance.post<VacationModel>(`/vacation/vacation-add`, vacation, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const vacations = response.data;
        const action = vacationActions.createVacation(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async annihilateVacation(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/vacation/vacation-delete/${id}`);
        const successStatus = response.data;
        const action = vacationActions.annihilateVacation(id);
        store.dispatch(action);
        return successStatus;
    }

    public async editVacation(id: string, draft: VacationDraftModel): Promise<VacationModel> {
        const response = await this.axiosInstance.patch<VacationModel>(`/vacation/vacation-edit/${id}`, draft, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const vacation = response.data;
        const action = vacationActions.editVacation(vacation);
        store.dispatch(action);
        return vacation;
    }

    public async extractUsers(id: string): Promise<VacationModel[]> {
        const response = await this.axiosInstance.get<VacationModel[]>(`/vacation/vacation-likers/${id}`);
        const likers = response.data;
        const action = vacationActions.initializeVacations(likers);
        store.dispatch(action);
        return likers;
    }

    public async getOneVacation(id: string): Promise<VacationModel> {
        const response = await this.axiosInstance.get<VacationModel>(`/vacation/${id}`);
        const vacation = response.data
        return vacation;
    }
}





