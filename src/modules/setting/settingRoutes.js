import { paths } from "../../constants/path";
import { UpdateCategory } from "./entry/UpdateCategory";
import { UpdateService } from "./entry/UpdateService";
import { Setting } from "./view/Setting";

export const settingRoutes = [
    {
        path: paths.SETTING,
        element: <Setting />
    },
    {
        path: `${paths.SETTING}/service/:id`,
        element: <UpdateService />
    },
    {
        path: `${paths.SETTING}/category/:id`,
        element: <UpdateCategory />
    }
]