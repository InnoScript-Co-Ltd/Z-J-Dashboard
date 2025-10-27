import { paths } from "./path";

export const features = [
    {
        name: "Dashboard",
        icon: "pi pi-desktop",
        description: "View key metrics and performance indicators at a glance.",
        link: paths.DASHBOARD
    },
    {
        name: "Visa Services",
        icon: "pi pi-book",
        description: "Handle purchase orders and supplier relationships.",
        link: paths.VISA_SERVICE_LIST
    },
    {
        name: "Administrator",
        icon: "pi pi-users",
        description: "Manage employee records and roles within the organization.",
        link: paths.ADMIN_LIST
    },
    {
        name: "Settings",
        icon: "pi pi-cog",
        description: "Configure application settings and preferences.",
        link: "/settings"
    }
]