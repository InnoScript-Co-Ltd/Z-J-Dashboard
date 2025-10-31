import { Button } from "primereact/button"
import { TabView, TabPanel } from 'primereact/tabview';
import { HeaderBar } from "../../../components/HeaderBar"
import { paths } from "../../../constants/path"
import { BackButton } from "../../../components/BackButton";
import { ConfirmCustomerList } from "./ConfrimCustomerList";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { settingServices } from "../../setting/settingServices";
import { useNavigate } from "react-router-dom";

export const CustomerList = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const init = useCallback(async () => {
        setLoading(true);
        await settingServices.serviceIndex(dispatch, { filter: "status", value: "ACTIVE"});
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
                
                <div className="flex flex-row justify-content-start align-items-center">
                    <Button 
                        size="small"
                        label="Create Customer"
                        icon="pi pi-plus-circle"
                        disabled={loading}
                        onClick={() => navigate(paths.CUSTOMER_CREATE)}
                    />
                </div>
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Customer List">
                        <ConfirmCustomerList />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}