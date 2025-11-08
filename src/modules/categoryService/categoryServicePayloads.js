import { paginateOptions } from "../../constants/settings";

export const categoryServicePayloads = {
    categoryServiceCreateOrUpdate: {
        name: "",
        category_id: "",
        fees: "",
        description: "",
        status: ""
    },

    categoryServicePaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,category_id,name,fees,description,status",
        search: "",
        order:"id",
        sort: "DESC" 
    },

    categoryServiceColumns: [
        { field: "name", header: "Service Name", sortable: true, show: true, },
        { field: "category", header: "Service Category", sortable: false, show: true},
        { field: "fees", header: "Service Fees", sortable: false, show: true},
        { field: "description", header: "Description", sortable: true, show: true, width: "500px" },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "action", header: "Action", sortable: false, show: true },
    ]
}