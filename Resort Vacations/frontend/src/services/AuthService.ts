import { UserLoginModel } from "../models/UserLogin";
import { UserSignUpModel } from "../models/UserSignUp";
import Awareness from "../utilities/Awareness";

export default class AuthService extends Awareness {
    public async login(login: UserLoginModel): Promise<{ jwt: string }> {
        const { data } = await this.axiosInstance.post<{ jwt: string }>(`/login`, login);
        return data;
    }
    public async signUp(signUp: UserSignUpModel): Promise<{ jwt: string }> {
        const { data } = await this.axiosInstance.post<{ jwt: string }>(`/sign-up`, signUp);
        return data;
    }
}
