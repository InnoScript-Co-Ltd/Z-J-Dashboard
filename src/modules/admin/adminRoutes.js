import { paths } from "../../constants/path";
import { CreateAdmin } from "./entry/CreateAdmin";
import { AdminDetail } from "./view/AdminDetail";
import { AdminList } from "./view/AdminList";

export const adminRoutes = [
    {
        path: paths.ADMIN_LIST,
        element: <AdminList />
    },

    {
        path: paths.ADMIN_CREATE,
        element: <CreateAdmin />
    }, 

    {
        path: `${paths.ADMIN_LIST}/:id`,
        element: <AdminDetail />
    }
]