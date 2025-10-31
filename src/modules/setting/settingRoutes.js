import { paths } from "../../constants/path";
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
]