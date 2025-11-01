import { paginateOptions } from "../../constants/settings";

export const settingPayloads = {
    servcieCreateOrUpdate: {
        service_type: "",
        description: "",
        fees: "",
        status: ""
    },

    yearOfInsurances: [
        { code: "ပန်းရောင်ကဒ် (ပါ) - အာမခံ ၁ နှစ်", name: "ပန်းရောင်ကဒ် (ပါ) - အာမခံ ၁ နှစ်" , keyword: "PINK_CARD_ONE_YEAR_INSURANCE"},
        { code: "ပန်းရောင်ကဒ် (ပါ) - အာမခံ 6 လ", name: "ပန်းရောင်ကဒ် (ပါ) - အာမခံ 6 လ", keyword: "PINK_CARD_SIX_MONTHS_INSURANCE" },
        { code: "ပန်းရောင်ကဒ် (မပါ) - အာမခံ ၁ နှစ်", name: "ပန်းရောင်ကဒ် (မပါ) - အာမခံ ၁ နှစ်", keyword: "NO_PINK_CARD_ONE_YEAR_INSURANCE" },
        { code: "ပန်းရောင်ကဒ် (မပါ) - အာမခံ 6 လ", name: "ပန်းရောင်ကဒ် (မပါ) - အာမခံ 6 လ", keyword: "NO_PINK_CARD_SIX_MONTHS_INSURANCE" },
    ],

    servicePaginateParams: {
        page: 1,
        rows: paginateOptions.rows,
        columns: "id,service_type,fees,status",
        search: "",
        order:"id",
        sort: "DESC"
    },

    serviceColumns: [
        { field: "service_type", header: "Service Type", sortable: true, show: true },
        { field: "fees", header: "Fees", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
    ],
}