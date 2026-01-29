import { UserLoginModel } from "./UserLogin"

export interface UserSignUpModel extends UserLoginModel{
    firstName: string
    lastName: string
}


