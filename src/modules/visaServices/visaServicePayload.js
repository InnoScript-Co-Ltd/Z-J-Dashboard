import { paginateOptions } from "../../constants/settings";

export const visaServicePayloads = {
    visaTypes: [
        { code: "TR30", name: "TR30" },
        { code: "W14", name: "W14" },
    ],

    serviceTypes: [
        { code: "VIP", name: "VIP" },
        { code: "VVIP", name: "VVIP" },
        { code: "VISA_RUN", name: "VISA_RUN" },
    ],

    statusTypes: [
        { code: "PROCESSING", name: "PROCESSING" },
        { code: "UNDER_CHECKING", name: "UNDER_CHECKING" },
        { code: "APPOINTMENT_CONFIRMED", name: "APPOINTMENT_CONFIRMED" },
        { code: "ACCOMPLISHED", name: "ACCOMPLISHED" },
    ],

    create: {
        name: "",
        passport: "",
        passport_image: "",
        visa_type: { code: "TR30", name: "TR30" },
        visa_entry_date: "",
        visa_expiry_date: "",
        appointment_date: "",
        new_visa_expired_date: "",
        service_type: { code: "VIP", name: "VIP" },
        status: { code: "PROCESSING", name: "PROCESSING" },
    },

    paginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,name,passport",
        search: "",
        order:"id",
        sort: "DESC"
    },

    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "passport", header: "Passport", sortable: true, show: true },
        { field: "passport_image", header: "Passport Photo", sortable: true, show: true },
        { field: "visa_type", header: "Visa Type", sortable: true, show: true },
        { field: "service_type", header: "Service Type", sortable: true, show: true },
        { field: "visa_entry_date", header: "Visa Entry Date", sortable: true, show: true },
        { field: "visa_expiry_date", header: "Visa Expired Date", sortable: true, show: true },
        { field: "appointment_date", header: "Appointment Date", sortable: true, show: true },
        { field: "new_visa_expired_date", header: "New Visa Expired Date", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
    ]
}