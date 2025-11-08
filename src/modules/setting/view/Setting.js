import { TabPanel, TabView } from "primereact/tabview"
import { BackButton } from "../../../components/BackButton"
import { HeaderBar } from "../../../components/HeaderBar"
import { CreateCategory } from "../../categories/entry/CreateCategory"
import { CategoryList } from "../../categories/view/CategoryList";
import { ConfirmDialog } from "primereact/confirmdialog";
import { CategoryServiceList } from "../../categoryService/view/CategoryServiceList";
import { CreateCategoryService } from "../../categoryService/entry/CreateCategoryService";

export const Setting = () => {

    return(
        <>
            <ConfirmDialog />
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton isConfirm={true} />
            </div>

            <div className="w-full p-3">
                <TabView>
                    <TabPanel header="Category">
                        <CreateCategory />
                        <CategoryList />
                    </TabPanel>

                    <TabPanel header="Category Service">
                        <CreateCategoryService />
                        <CategoryServiceList />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}