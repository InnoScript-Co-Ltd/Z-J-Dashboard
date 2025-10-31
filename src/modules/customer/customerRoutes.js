import { paths } from "../../constants/path";
import { CreateCustomer } from "./entry/CreateCustomer";
import { UpdateCustomer } from "./entry/UpdateCustomer";
import { CustomerList } from "./view/CustomerList";

export const customerRoutes = [
    {
        path: paths.CUSTOMER_LIST,
        element: <CustomerList />
    },

    {
        path: paths.CUSTOMER_CREATE,
        element: <CreateCustomer />
    }, 

    {
        path: `${paths.CUSTOMER_LIST}/:id`,
        element: <UpdateCustomer />
    },
]