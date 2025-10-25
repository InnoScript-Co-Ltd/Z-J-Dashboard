import { Button } from "primereact/button"
import { TabView, TabPanel } from 'primereact/tabview';
import { HeaderBar } from "../../../components/HeaderBar"
import { BackButton } from "../../../components/BackButton"
import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../../../constants/path"
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { adminServices } from "../adminService";
import { AdminResetPassword } from "../entry/AdminResetPassword";
import { AdminAccountDetail } from "./AdminAccountDetail";
import { AdminActivity } from "./AdminActivity";

export const AdminDetail = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const init = useCallback( async () => {
        await adminServices.show(dispatch, params.id);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    return(
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
                
                <div className="flex flex-row justify-content-start align-items-center">
                    <Button 
                        size="small"
                        label="Create Admin Account"
                        icon="pi pi-plus-circle"
                        onClick={() => navigate(paths.ADMIN_CREATE)}
                    />
                </div>
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Account Information">
                        <AdminAccountDetail />
                    </TabPanel>

                    <TabPanel header="Actvity Logs">
                        <AdminActivity />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}