import { RoleModel } from "./Role"
import { UserLoginModel } from "./UserLogin"
import { VacationModel } from "./Vacation"

export interface UserModel extends UserLoginModel{
    id: string
    roleId: string
    role: RoleModel[]
    likedVacations: VacationModel[]
}

