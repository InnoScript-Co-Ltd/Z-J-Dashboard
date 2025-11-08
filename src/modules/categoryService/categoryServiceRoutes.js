import { paths } from "../../constants/path";
import { UpdateCategoryService } from "./entry/UpdateCategoryService";

export const categoryServiceRoutes = [
    {
        path: `${paths.CATEGORY_SERVICE}/:id`,
        element: <UpdateCategoryService />
    }
]