import { paths } from "../../constants/path";
import { CreateCustomer } from "./entry/CreateCustomer";
import { CustomerList } from "./view/CustomerList";

export const customerRoutes = [
    {
        path: paths.CUSTOMERLIST,
        element: <CustomerList />
    },
    {
        path: paths.CUSTOMER_CREATE,
        element: <CreateCustomer />
    }
]