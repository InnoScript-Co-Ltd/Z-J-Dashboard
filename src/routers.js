import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./modules/user/userRoutes";
import { dashboardRoutes } from "./modules/dashboard/dashboardRoutes";
import { paths } from "./constants/path";
import { Login } from "./modules/user/entry/Login";
import { ForgetPassword } from "./modules/user/entry/ForgetPassword";
import { VerifyCode } from "./modules/user/entry/VerifyCode";
import { ResetPassword } from "./modules/user/entry/ResetPassword";
import { Layout } from "./Layout";
import { homeRoutes } from "./modules/home/homeRoutes";
import { saleRoutes } from "./modules/sales/salueRoutes";
import { customerRoutes } from "./modules/customer/customerRoutes";
import { resellerRoutes } from "./modules/reseller/resellerRoutes";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...homeRoutes,
            ...dashboardRoutes,
            ...userRoutes,
            ...saleRoutes,
            ...customerRoutes,
            ...resellerRoutes
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