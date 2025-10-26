import { paginateOptions } from "../../constants/settings";

export const adminPayloads = {
    login: {
        email: "",
        password: ""
    },

    create: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    },

    update: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        status: ""
    },

    changePassword: {
        old_password: "",
        password: "",
        confirm_password: ""
    },

    status: [
        { code: "PENDING", name: "PENDING" },
        { code: "ACTIVE", name: "ACTIVE" },
        { code: "DELETED", name: "DELETED" },
        { code: "BLOCK", name: "BLOCK" }
    ],

    paginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,first_name,last_name,phone,email,status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    activityPaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,name,action,created_at",
        search: "",
        order:"created_at",
        sort: "ASC",
        start_date: new Date().toLocaleDateString('en-CA'),
        end_date: new Date().toLocaleDateString('en-CA'),
    },
    
    columns: [
        { field: "name", header: "Name", sortable: false, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "status", header: "Status", sortable: false, show: true },
        { field: "option", header: "Option", sortable: false, show: true },
    ],

    delColumns: [
        { field: "name", header: "Name", sortable: false, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "deleted_at", header: "Deleted At", sortable: true, show: true },
        { field: "status", header: "Status", sortable: false, show: true },
        { field: "option", header: "Option", sortable: false, show: true },
    ],

    activityColumns: [
        { field: "name", header: "Name", sortable: true, show: true },
        // { field: "description", header: "Description", sortable: false, show: true },
        { field: "action", header: "Action", sortable: true, show: true },
        { field: "created_at", header: "Log Time", sortable: true, show: true },
    ],
}