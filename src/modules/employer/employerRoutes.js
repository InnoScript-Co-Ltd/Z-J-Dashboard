import { paths } from "../../constants/path";
import { CreateEmployer } from "./entry/CreateEmployer";
import { EmployerList } from "./view/EmployerList";

export const employerRoutes = [
    {
        path: paths.EMPLOYER,
        element: <EmployerList />
    },
    {
        path: `${paths.EMPLOYER}/create`,
        element: <CreateEmployer />
    }
]