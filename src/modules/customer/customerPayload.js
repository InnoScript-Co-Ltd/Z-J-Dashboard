import { paginateOptions } from "../../constants/settings";

export const customerPayloads = {
    createOrUpdate: {
        fullname: "",
        registered_at: "",
        nrc: "",
        photo: "",
        passport_ci: "",
        dob: "",
        phone: "",
        contact_by: "",
        social_app: "",
        marketing_status: { name: 'STILL', code: 'STILL' },
        remark: ""
    },

    paginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,fullname,nrc,passport_ci,dob,phone,contact_by,social_app,marketing_status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    columns: [
        { field: "referrance_id", header: "Referrance Id", sortable: true, show: true },
        { field: "registered_at", header: "Registered Date", sortable: true, show: true },
        { field: "fullname", header: "Name", sortable: true, show: true },
        { field: "nrc", header: "NRC", sortable: true, show: true },
        { field: "passport_ci", header: "Passport CI", sortable: true, show: true },
        { field: "dob", header: "Date of Birth", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "contact_by", header: "Contact By", sortable: true, show: true },
        { field: "social_app", header: "Social App", sortable: true, show: true },
        { field: "marketing_status", header: "Marketing Status", sortable: true, show: true},
        { field: "remark", header: "Remark", sortable: true, show: true},
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        
    ]
}