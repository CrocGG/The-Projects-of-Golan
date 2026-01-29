import { UserModel } from "../models/User";
import { UserLoginModel } from "../models/UserLogin";
import { userActions } from "../redux/slices/UserSlice";
import { store } from "../redux/Store";
import Awareness from "../utilities/Awareness";

export default class UserService extends Awareness {

    public async getUsers(): Promise<UserModel[]> {
        const response = await this.axiosInstance.get<UserModel[]>(`/user`);
        const users = response.data;
        const action = userActions.initializeUsers(users);
        store.dispatch(action);
        return users;
    }

    public async createUser(user: UserLoginModel): Promise<UserModel> {
        const response = await this.axiosInstance.post<UserModel>(`/login`, user);
        const users = response.data;
        const action = userActions.createUser(users);
        store.dispatch(action);
        return users;
    }

    public async extractVacations(): Promise<UserModel[]> {
        const response = await this.axiosInstance.get<UserModel[]>(`/user/vacation-liked`);
        const likedVacations = response.data;
        const action = userActions.initializeUsers(likedVacations);
        store.dispatch(action);
        return likedVacations;
    }

}





