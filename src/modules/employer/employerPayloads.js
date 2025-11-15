import { paginateOptions } from "../../constants/settings";

export const employerPayloads = {
    employerCreateOrUpdate: {
        full_name: "",
        national_card_number: "", 
        household_photo: "", 
        national_card_photo: "", 
        employer_type: "", 
        company_documents: []
    },

    employerType: [
        { code: "NORMAL", name: "NORMAL" },
        { code: "COMPANY", name: "COMPANY" }
    ],

    employerPaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "code,full_name,national_card_number",
        search: "",
        order:"id",
        sort: "DESC" 
    },

    employerColumns: [
        { field: "code", header: "Code", sortable: false, show: true },
        { field: "full_name", header: "Full Name", sortable: true, show: true },
        { field: "national_card_number", header: "National Card ID", sortable: true, show: true },
        { field: "employer_type", header: "Type", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "action", header: "Action", sortable: false, show: true, width: "500px" }
    ],
}