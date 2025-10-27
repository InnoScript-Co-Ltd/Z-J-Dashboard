import { Button } from "primereact/button"
import { TabView, TabPanel } from 'primereact/tabview';
import { HeaderBar } from "../../../components/HeaderBar"
import { useNavigate } from "react-router-dom"
import { paths } from "../../../constants/path"
import { BackButton } from "../../../components/BackButton";
import { ConfirmCustomerList } from "./ConfrimCustomerList";

export const CustomerList = () => {

    const navigate = useNavigate();

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
                        onClick={() => navigate(paths.CUSTOMER_CREATE)}
                    />
                </div>
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Confirm">
                        <ConfirmCustomerList />
                    </TabPanel>
{/* 
                    <TabPanel header="Pending">
                        <PendingAdminList />
                    </TabPanel>

                    <TabPanel header="Deleted">
                        <DeleteAdminList />
                    </TabPanel> */}
                </TabView>
            </div>
        </>
    )
}