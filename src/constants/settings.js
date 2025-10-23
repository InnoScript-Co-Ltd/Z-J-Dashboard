import { Button } from "primereact/button";

export const CURRENT_LANG = "CURRENT_LANG";

export const DEFAULT_LANG = "eng";

export const currentLang = localStorage.getItem(CURRENT_LANG) ? localStorage.getItem(CURRENT_LANG) : DEFAULT_LANG;

const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
// const paginatorRight = <Button type="button" icon="pi pi-download" text />;


export const env = [
  "http://localhost:8000",
  "http://api.evanglobalmanagement.com",
];

export const paginateOptions = {
  rows: 50,
  rowsPerPageOptions: [10, 50, 100, 150, 500, 1000],
  total: 0,
  paginatorTemplate:
    "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
  currentPageReportTemplate: "{first} to {last} of {totalRecords}",
  paginatorLeft: paginatorLeft,
  sortMode: "single",
  resizableColumns: true,
  lazy: true,
};

export const keys = {
  API_TOKEN: "TOKEN",
  USER: "USER",
  PERMISSION: "PERMISSION",
  ROLE: "ROLE",
  LANGUAGE: "LANGUAGE",
};

// export const bankTypes = [
//   {
//     label: "AYA BANK",
//     value: "aya_bank",
//     icon: require("../assets/images/AyaBankLogo.png"),
//   },
//   {
//     label: "CB BANK",
//     value: "cb_bank",
//     icon: require("../assets/images/CBBankLogo.png"),
//   },
//   {
//     label: "UAB BANK",
//     value: "uab_bank",
//     icon: require("../assets/images/UABBankLogo.png"),
//   },
//   {
//     label: "KBZ BANK SPECIAL ACC",
//     value: "kbz_bank_special",
//     icon: require("../assets/images/KBZBankLogo.png"),
//   },
//   {
//     label: "A BANK",
//     value: "a_bank",
//     icon: require("../assets/images/ABankLogo.png"),
//   },
//   {
//     label: "MCB BANK",
//     value: "mcb_bank",
//     icon: require("../assets/images/MCBBankLogo.png"),
//   },

//   {
//     label: "YOMA (Flexi every day)",
//     value: "yoma_bank_flexi",
//     icon: require("../assets/images/YoMaBankLogo.png"),
//   },
//   {
//     label: "YOMA (Flexi saving)",
//     value: "yoma_bank_flexi_saving",
//     icon: require("../assets/images/YoMaBankLogo.png"),
//   },
//   {
//     label: "YOMA (Flexi acc)",
//     value: "yoma_bank_flexi_acc",
//     icon: require("../assets/images/YoMaBankLogo.png"),
//   },
// ];

export const ReferralLinkType = {
  LEVEL_FOUR_REFERRAL: "LEVEL_FOUR_REFERRAL",
  CLIENT_REFERRAL: "CLIENT_REFERRAL",
  COMMISSION_REFERRAL: "COMMISSION_REFERRAL",
};

export const AgentType = {
  MAIN_AGENT: "MAIN_AGENT",
  SUB_AGENT: "SUB_AGENT",
};

export const notificationOptions = {
  severity: "info",
  sticky: false,
  life: 2000,
  closable: true,
  icon: "pi pi-info-circle",
};

export const statusOptions = [
  { status: "ACTIVE", color: "success" },
  { status: "DISABLE", color: "danger" },
  { status: "DELETED", color: "danger" },
  { status: "PENDING", color: "warning" },
];

export const tooltipOptions = {
  position: "top",
};

export const responsiveOptions = [
  {
    breakpoint: "991px",
    numVisible: 4,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
];

export const itemTemplate = (item) => {
  return (
    <img
      src={item?.itemImageSrc}
      alt={"GSC Export"}
      style={{ width: "100%", minHeight: "368px", display: "block" }}
    />
  );
};

export const thumbnailTemplate = (item) => {
  return (
    <img
      width={100}
      height={80}
      src={item.thumbnailImageSrc}
      alt={item.alt}
      style={{ display: "block" }}
    />
  );
};

/**
 * Language / Region / Country
 */
export const countries = [
  { name: "China", code: "CN" },
  { name: "Myanmar", code: "MM" },
  { name: "English", code: "UK" },
];
export const defaultLanguage = localStorage.getItem(keys.LANGUAGE)
  ? localStorage.getItem(keys.LANGUAGE)
  : countries[1];

export const renderHeader = () => {
  return (
    <span className="ql-formats">
      <select className="ql-font">
        <option value="serif"></option>
        <option value="sans-serif"></option>
        <option value="monospace"></option>
      </select>
      <select className="ql-size">
        <option value="small"></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-align" aria-label="Align"></button>
      <button className="ql-color" aria-label="Color"></button>
      <button className="ql-background" aria-label="Background"></button>
      <button className="ql-list" aria-label="Ordered"></button>
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
      <button className="ql-code" aria-label="Code"></button>
      <button className="ql-link" aria-label="Link"></button>
      <button className="ql-clean" aria-label="Clean"></button>
    </span>
  );
};