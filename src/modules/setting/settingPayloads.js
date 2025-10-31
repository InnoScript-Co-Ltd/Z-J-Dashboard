import { paginateOptions } from "../../constants/settings";

export const settingPayloads = {
    servcieCreateOrUpdate: {
        service_type: "",
        description: "",
        fees: "",
        status: ""
    },

    yearOfInsurances: [
        { code: "6 Months (Pink Card)", name: "6 Months (Pink Card)" },
        { code: "1 Year (Pink Card)", name: "1 Year (Pink Card)" },
        { code: "6 Months (Non Pink Card)", name: "6 Months (Non Pink Card)" },
        { code: "1 Year (Non Pink Card)", name: "1 Year (Non Pink Card)" },
    ],

    servicePaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,service_type,fees,status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    serviceColumns: [
        { field: "service_type", header: "Service Type", sortable: true, show: true },
        { field: "fees", header: "Fees", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
    ],
}