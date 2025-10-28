import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { dashboardRoutes } from "./modules/dashboard/dashboardRoutes";
import { paths } from "./constants/path";
import { Login } from "./modules/admin/entry/Login";
import { ForgetPassword } from "./modules/admin/entry/ForgetPassword";
import { VerifyCode } from "./modules/admin/entry/VerifyCode";
import { ResetPassword } from "./modules/admin/entry/ResetPassword";
import { Layout } from "./Layout";
import { homeRoutes } from "./modules/home/homeRoutes";
import { visaServiceRoutes } from "./modules/visaServices/visaServiceRoutes";
import { customerRoutes } from "./modules/customer/customerRoutes";
import { settingRoutes } from "./modules/setting/settingRoutes";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...homeRoutes,
            ...dashboardRoutes,
            ...adminRoutes,
            ...visaServiceRoutes,
            ...customerRoutes,
            ...settingRoutes
        ]
    },
    {
        path: paths.LOGIN,
        element: <Login />
    },
    {
        path: paths.FORGET_PASSWORD,
        element: <ForgetPassword />
    },
    {
        path: paths.VERIFY_OTP,
        element: <VerifyCode /> 
    },
    {
        path: paths.RESET_PASSWORD,
        element: <ResetPassword />
    },
]);