import { LikerModel } from "../models/Liker";
import { likerActions } from "../redux/slices/LikerSlice";
import { store } from "../redux/Store";
import Awareness from "../utilities/Awareness";


export default class LikerService extends Awareness {

    public async getLikers(): Promise<LikerModel[]> {
        const response = await this.axiosInstance.get<LikerModel[]>(`/liker`);
        const likers = response.data;
        const action = likerActions.initializeLikers(likers);
        store.dispatch(action);
        return likers;
    }

    public async createLiker(id: string): Promise<LikerModel> {
        const response = await this.axiosInstance.post<LikerModel>(`/liker/like-it/${id}`);
        const likers = response.data;
        const action = likerActions.createLiker(likers);
        store.dispatch(action);
        return likers;
    }

    public async annihilateLiker(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/liker/hate-it/${id}`);
        const successStatus = response.data;
        const action = likerActions.annihilateLiker(id);
        store.dispatch(action);
        return successStatus;
    }
}





