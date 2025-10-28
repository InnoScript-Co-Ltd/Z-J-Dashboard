import { TabPanel, TabView } from "primereact/tabview"
import { BackButton } from "../../../components/BackButton"
import { HeaderBar } from "../../../components/HeaderBar"
import { ServiceList } from "./ServiceList"

export const Setting = () => {

    return(
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Service">
                        <ServiceList />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}