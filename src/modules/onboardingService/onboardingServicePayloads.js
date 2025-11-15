import { paginateOptions } from "../../constants/settings";

export const onboardingServicePayloads = {
    onboardingServiceCreateOrUpdate: {
        customer_id: "",
        customer_name: "",
        category_id: "",
        category: "",
        category_service_id: "",
        service: "",
        fees: "",
        deposit: "",
        balance: "",
        employer_type: "",
        employer_id: "",
        employer_name: "",
        remark: "",
        status: ""
    },

    customerContactByTypes: [
        { code: "Tiktok", name: "Tiktok" },
        { code: "Facebook", name: "Facebook" },
        { code: "Instagram", name: "Instagram" },
        { code: "WhatsApp", name: "WhatsApp" },
        { code: "LinkedIn", name: "LinkedIn" },
        { code: "Line", name: "Line" },
        { code: "Telegram", name: "Telegram" },
        { code: "Viber", name: "Viber" },
        { code: "Phone", name: "Phone" },
        { code: "Email", name: "Email" },
        { code: "WalkIn", name: "Walk In" }
    ],

    status: [
        { code: "DEPOSIT", name: "DEPOSIT"},
        { code: "COMPLETED", name: "COMPLETED" },
        { code: "CANCELED", name: "CANCELED" },
        { code: "REFUND", name: "REFUND" }
    ],

    onboardingServicePaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,customer_name,employer_name,service,category,employer_type,status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    onboardingServiceColumns: [
        { field: "customer_name", header: "Customer", sortable: true, show: true, width: "250px" },
        { field: "category", header: "Category", sortable: true, show: true, width: "250px" },
        { field: "service", header: "Service", sortable: true, show: true, width: "250px" },
        { field: "employer_name", header: "Employer", sortable: true, show: true, width: "250px" },
        { field: "employer_type", header: "Employer Type", sortable: true, show: true, width: "200px" },
        { field: "fees", header: "Service Fees", sortable: true, show: true, width: "200px" },
        { field: "deposit", header: "Deposit", sortable: true, show: true, width: "200px" },
        { field: "balance", header: "Balance", sortable: true, show: true, width: "200px" },
        { field: "status", header: "Status", sortable: true, show: true, width: "100px" },
        { field: "created_at", header: "Created At", sortable: true, show: true, width: "200px" },
        { field: "updated_at", header: "Updated At", sortable: true, show: true, width: "200px" },
        { field: "action", header: "Action", sortable: true, show: true, width: "100px" }
    ],
}