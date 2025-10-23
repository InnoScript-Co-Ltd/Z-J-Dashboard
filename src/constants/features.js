import { paths } from "./path";

export const features = [
    {
        name: "Dashboard",
        icon: "pi pi-desktop",
        description: "View key metrics and performance indicators at a glance.",
        link: paths.DASHBOARD
    },
    {
        name: "Sales",
        icon: "pi pi-cart-plus",
        description: "Manage and track your sales activities and performance.",
        link: "/sales"
    },
    {
        name: "Invoice",
        icon: "pi pi-receipt",
        description: "Create, send, and manage invoices for your customers.",
        link: "/invoice"
    },
    {
        name: "Customer",
        icon: "pi pi-address-book",
        description: "Manage customer information and interactions.",
        link: "/customer"
    },
    {
        name: "Reports",
        icon: "pi pi-chart-bar",
        description: "Generate and view detailed reports on various aspects of your business.",
        link: "/reports"
    },
    {
        name: "Inventory",
        icon: "pi pi-warehouse",
        description: "Monitor and manage your stock levels and product availability.",
        link: "/inventory"
    },
    {
        name: "Purchases",
        icon: "pi pi-cart-arrow-down",
        description: "Handle purchase orders and supplier relationships.",
        link: "/purchases"
    },
    {
        name: "Employees",
        icon: "pi pi-users",
        description: "Manage employee records and roles within the organization.",
        link: "/employees"
    },
    {
        name: "Reseller",
        icon: "pi pi-user",
        description: "Manage reseller accounts and permissions.",
        link: paths.RESELLER_LIST
    },
    {
        name: "Settings",
        icon: "pi pi-cog",
        description: "Configure application settings and preferences.",
        link: "/settings"
    }
]