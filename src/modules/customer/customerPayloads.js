import { paginateOptions } from "../../constants/settings";

export const customerPayloads = {
    customerCreateOrUpdate: {
        name: "",
        nrc: "",
        nrc_front: "",
        nrc_back: "",
        passport: "",
        dob: "",
        phone: "",
        email: "",
        contact_by: "",
        social_app: "",
        remark: "",
        status: "",
        passport_photo: "",
        household_photo: "",
        photo: "",
        social_link_qrcode: "",
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

    customerStatus: [
        { code: "CONFIRMED", name: "CONFIRMED" },
        { code: "STILL", name: "STILL" },
        { code: "CANCEL", name: "CANCEL" },
    ],

    customerPaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,reference_id,name,nrc,passport,dob,phone,email,social_app",
        search: "",
        order:"id",
        sort: "DESC"
    },

    customerColumns: [
        { field: "reference_id", header: "Reference Id", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "nrc", header: "Nrc", sortable: true, show: true },
        { field: "passport", header: "Passport", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "action", header: "Action", sortable: false, show: true },
    ],
}