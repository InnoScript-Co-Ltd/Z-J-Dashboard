import { paginateOptions } from "../../constants/settings";

export const settingPayloads = {
    createOrUpdate: {
        name: "",
        photo: "",
        nrc: "",
        nrc_front: "",
        nrc_back: "",
        passport: "",
        passport_photo: "",
        dob: "",
        phone: "",
        email: "",
        contact_by: "",
        social_app: "",
        social_link_qrcode: "",
        remark: "",
        status: "",
        year_of_insurance: "",
        fees: "",
        deposit_amount: "",
        balance: "",
        pink_card: "",
        employer: "",
        employer_type: "",
        employer_photo: "",
        employer_household_photo: "",
        employer_company_data: ""
    },

    contactByTypes: [
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
        { code: "CONFIRMED", name: "CONFIRMED" },
        { code: "STILL", name: "STILL" },
        { code: "CANCEL", name: "CANCEL" },
    ],

    employer: [
        { code: "EMPLOYER", name: "EMPLOYER" },
        { code: "HIRE_EMPLOYER", name: "HIRE_EMPLOYER" },
    ],

    employerTypes: [
        { code: "NORMAL", name: "NORMAL" },
        { code: "COMPANY", name: "COMPANY" },
    ],

    yearOfInsurances: [
        { code: "6 Months", name: "6 Months" },
        { code: "1 Year", name: "1 Year" },
    ],

    servicePaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,name,status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    serviceColumns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
    ],
}