import { paginateOptions } from "../../constants/settings";

export const resellerPayloads = {
    create: {
        first_name: "",
        last_name: "",
        phone: "",
        gender: { name: 'MALE', code: 'FEMALE' },
        password: "",
        status: { name: "PENDING", code: "PENDING" }
    },

    update: {
        first_name: "",
        last_name: "",
        profile: "",
        phone: "",
        gender: "",
        nrc: "",
        nrc_front: "",
        nrc_back: "",
        address: "", 
        password: "",
        status: ""
    },

    paginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,first_name,last_name,phone,gender,status",
        search: "",
        order:"phone",
        sort: "DESC"
    },

    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "gender", header: "Gender", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        
    ]
}