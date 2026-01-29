import { Navigate, Route, Routes } from "react-router-dom";
import GetVacationManager from "../../pages/get-vacation-manager/GetVacationManager";
import AddVacation from "../../pages/add-vacation/AddVacation";
import EditVacation from "../../pages/edit-vacation/EditVacation";
import VacationReport from "../../pages/vacation-report/VacationReport";
import NotFound from "../../pages/not-found/NotFound";
import { useRoleId } from "../../../hooks/use-role-id";
import { MANAGER_ID, NORMAL_ID } from "../../../utilities/RoleIds";
import GetVacationNormalLiked from "../../pages/get-vacation-normal-liked/GetVacationNormalLiked";
import GetVacationNormalUpcoming from "../../pages/get-vacation-normal-upcoming/GetVacationNormalUpcoming";
import GetVacationNormalActive from "../../pages/get-vacation-normal-active/GetVacationNormalActive";
import GetVacationNormalEvery from "../../pages/get-vacation-normal-every/GetVacationNormalEvery";

export default function Routing() {

    const roleId = useRoleId()

    return (
        <Routes>
            {roleId === NORMAL_ID &&
                <>
                    <Route path="/" element={<Navigate to="/vacation/vacation-normal/vacation-every" />} />
                    <Route path="/vacation" element={<Navigate to="/vacation/vacation-normal/vacation-every" />} />
                    <Route path="/vacation/vacation-normal/vacation-every" element={<GetVacationNormalEvery />} />
                    <Route path="/vacation/vacation-normal/vacation-liked" element={<GetVacationNormalLiked />} />
                    <Route path="/vacation/vacation-normal/vacation-upcoming" element={<GetVacationNormalUpcoming />} />
                    <Route path="/vacation/vacation-normal/vacation-active" element={<GetVacationNormalActive />} />
                </>}
            {roleId === MANAGER_ID &&
                <>
                    <Route path="/" element={<Navigate to="/vacation/vacation-manager" />} />
                    <Route path="/vacation" element={<Navigate to="/vacation/vacation-manager" />} />
                    <Route path="/vacation/vacation-manager" element={<GetVacationManager />} />
                    <Route path="/vacation/vacation-add" element={<AddVacation />} />
                    <Route path="/vacation/vacation-edit/:id" element={<EditVacation />} />
                    <Route path="/vacation/vacation-report" element={<VacationReport />} />
                </>}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
