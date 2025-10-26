import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { TabView, TabPanel } from 'primereact/tabview';
import { AdminAccountUpdate } from "../entry/AdminAccountUpdate";

export const AdminProfile = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    
    const init = useCallback( async () => {
        setLoading(true);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

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