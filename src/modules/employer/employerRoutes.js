import { paths } from "../../constants/path";
import { CreateEmployer } from "./entry/CreateEmployer";
import { UpdateEmployer } from "./entry/UpdateEmployer";
import { EmployerList } from "./view/EmployerList";

export const employerRoutes = [
    {
        path: paths.EMPLOYER,
        element: <EmployerList />
    },
    {
        path: `${paths.EMPLOYER}/create`,
        element: <CreateEmployer />
    },
    {
        path: `${paths.EMPLOYER}/update/:id`,
        element: <UpdateEmployer />
    }
]