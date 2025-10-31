import { paginateOptions } from "../../constants/settings";

export const customerPayloads = {
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

    paginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,name,nrc,passport,dob,phone,email,social_app,fees,deposit_amount,balance,year_of_insurance",
        search: "",
        order:"id",
        sort: "DESC"
    },

    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "nrc", header: "Nrc", sortable: true, show: true },
        { field: "passport", header: "Passport", sortable: true, show: true },
        { field: "dob", header: "DOB", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "social_app", header: "Social App", sortable: true, show: true },
        { field: "fees", header: "fees", sortable: true, show: true },
        { field: "deposit_amount", header: "Deposit Amount", sortable: true, show: true },
        { field: "balance", header: "Balance", sortable: true, show: true },
        { field: "pink_card", header: "Pink Card", sortable: true, show: true },
        { field: "year_of_insurance", header: "Year Of Insurance", sortable: true, show: true },
        { field: "contact_by", header: "Contact By", sortable: true, show: true },
        { field: "employer", header: "Employer", sortable: true, show: true },
        { field: "employer_type", header: "Employer Type", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "employer_company_data", header: "Company Data", sortable: true, show: true },
        { field: "remark", header: "Remark", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
    ],
}