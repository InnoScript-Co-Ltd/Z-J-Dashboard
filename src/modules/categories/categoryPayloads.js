import { paginateOptions } from "../../constants/settings";

export const categoryPayloads = {
    categoryCreateOrUpdate: {
        label: "",
        description: "",
        status: ""
    },

    categoryPaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,label,description,status",
        search: "",
        order:"id",
        sort: "DESC" 
    },

    categoryColumns: [
        { field: "label", header: "Label", sortable: true, show: true, },
        { field: "description", header: "Description", sortable: true, show: true, width: "500px" },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "action", header: "Action", sortable: false, show: true },
    ]
}