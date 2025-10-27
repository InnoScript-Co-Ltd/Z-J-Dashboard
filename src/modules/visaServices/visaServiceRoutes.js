import { paths } from "../../constants/path";
import { CreateVisaService } from "./entry/CreateVisaService";
import { UpdateVisaService } from "./entry/UpdateVisaService";
import { VisaServiceList } from "./view/VisaServiceList";

export const visaServiceRoutes = [
    {
        path: paths.VISA_SERVICE_CREATE,
        element: <CreateVisaService />
    },

    {
        path: paths.VISA_SERVICE_LIST,
        element: <VisaServiceList />
    },

    {
        path: `${paths.VISA_SERVICE_LIST}/:id`,
        element: <UpdateVisaService />
    }
]