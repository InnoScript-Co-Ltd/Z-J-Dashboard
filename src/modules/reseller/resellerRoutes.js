import { paths } from "../../constants/path";
import { CreateReseller } from "./entry/CreateReseller";
import { ResellerDetail } from "./view/ResellerDetail";
import { ResellerList } from "./view/ResellerList";

export const resellerRoutes = [
    {
        path: paths.RESELLER_LIST,
        element: <ResellerList />
    }, 
    {
        path: paths.RESELLER_CREATE,
        element: <CreateReseller />
    },
    {
        path: `${paths.RESELLER_LIST}/:id`,
        element: <ResellerDetail />
    }
]