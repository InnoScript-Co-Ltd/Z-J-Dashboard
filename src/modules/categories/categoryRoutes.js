import { paths } from "../../constants/path";
import { UpdateCategory } from "./entry/UpdateCategory";

export const categoryRoutes = [
    {
        path: `${paths.CATEGORY}/:id`,
        element: <UpdateCategory />
    }
]