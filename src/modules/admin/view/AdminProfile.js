import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { TabView, TabPanel } from 'primereact/tabview';
import { AdminAccountUpdate } from "../entry/AdminAccountUpdate";

export const AdminProfile = () => {

    return (
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Account Information">
                        <AdminAccountUpdate />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}   