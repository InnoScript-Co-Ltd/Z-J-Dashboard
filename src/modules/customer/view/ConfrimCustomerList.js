import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnNumber } from "../../../components/table/ColumnNumber";
import { paths } from "../../../constants/path";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnNavigate } from "../../../components/table/ColumnNavigate";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { TableSearch } from "../../../components/table/TableSearch";
import { setPaginate } from "../customerSlice";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { ValidationMessage } from "../../../components/ValidationMessage";
import { payloadHandler } from "../../../utilities/handlers";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { settingServices } from "../../setting/settingServices";

export const ConfirmCustomerList = () => {

    const { customers, paginateParams } = useSelector(state => state.customer);
    const { services, categories } = useSelector(state => state.setting);

    const [payload, setPayload] = useState(customerPayloads.createOrUpdate);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employer, setEmployer] = useState("");
    const [employerType, setEmployerType] = useState("");
    const [pinkCard, setPinkCard] = useState("");
    const [contactBy, setContactBy] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState(null);
    const [employerPhoto, setEmployerPhoto] = useState("");
    const [employerHouseHoldPhoto, setEmployerHouseholdPhoto] = useState("");

    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(customerPayloads.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const serviceTypes = useRef([]);
    const categoryTypes = useRef([]);

    const onPageChange = async (event) => {
        first.current = event.page * paginateParams.rows;
        dispatch(
            setPaginate({
                ...paginateParams,
                page: event?.page + 1,
                rows: event?.rows,
            })
        );
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setPaginate({
            ...paginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setPaginate({
            ...paginateParams,
            search: event,
        }));
    }

    const updateCustomerHandler = async() => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.employer_type = payload.employer_type.code;
        updatePayload.employer = payload.employer.code;
        updatePayload.year_of_insurance = payload.year_of_insurance.code;
        updatePayload.pink_card = payload.pink_card.code;

        const response = await customerServices.update(dispatch, data.id, updatePayload);
        if(response.status === 200) {
            setShow(false);
        }
        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await customerServices.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(services) {
            serviceTypes.current = services.map((value) => {
                return {
                    code: value.id,
                    name: value.service_type
                }
            })
        }
    }, [services]);


    useEffect(() => {
        if(categories) {
            categoryTypes.current = categories.map((value) => {
                return {
                    code: value.id,
                    name: value.label
                }
            })
        }
    }, [categories]);

    const FooterRender = () => {
        return (
            <div className='flex items-center justify-content-between'>
                <div> Total - <span>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(customerPayloads.paginateParams));
                        }}
                    />
                </div>
            </div>
        )
    }

    const HeaderRender = () => {
        return (
            <div className="mb-3">
                <div className="col-3 mr-3">
                    <label> Search Customer </label>
                    <TableSearch
                        tooltipLabel={customerPayloads.columns}
                        placeholder={"Search Customer"}
                        onSearch={(e) => onSearchChange(e)}
                    />
                </div>
                
                <div className="w-full flex flex-row align-items-center justify-content-start">
                    <div className="mt-3 mr-3">
                        <label> Filter By Categories </label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Service Category"
                            options={categoryTypes.current}
                            value={employer}
                            optionLabel="name"
                            onChange={(e) => {
                                setEmployer(e.value);
                                dispatch(setPaginate({
                                    ...paginateParams,
                                    filter: "employer",
                                    value: e.value.code
                                }))
                            }}
                        />
                    </div>

                    <div className="mt-3 mr-3">
                        <label> Filter By Employer Type </label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Employer Type"
                            options={customerPayloads.employerTypes}
                            value={employerType}
                            optionLabel="name"
                            onChange={(e) => {
                                setEmployerType(e.value);
                                dispatch(setPaginate({
                                    ...paginateParams,
                                    filter: "employer_type",
                                    value: e.value.code
                                }))
                            }}
                        />
                    </div>

                    <div className="mt-3 mr-3">
                        <label> Pink Card </label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Pink Card Type"
                            options={[
                                {code: "PINK_CARD_HOLDER", name: "PINK_CARD_HOLDER" },
                                { code: "NO_PINK_CARD", name: "NO_PINK_CARD" }
                            ]}
                            value={pinkCard}
                            optionLabel="name"
                            onChange={(e) => {
                                setPinkCard(e.value);
                                dispatch(setPaginate({
                                    ...paginateParams,
                                    filter: "pink_card",
                                    value: e.value.code
                                }))
                            }}
                        />
                    </div>

                    <div className="mt-3 mr-3">
                        <label> Contact By </label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Contact By"
                            options={customerPayloads.contactByTypes}
                            value={contactBy}
                            optionLabel="name"
                            onChange={(e) => {
                                setContactBy(e.value);
                                dispatch(setPaginate({
                                    ...paginateParams,
                                    filter: "contact_by",
                                    value: e.value.code
                                }));
                            }}
                        />
                    </div>

                    <div className="mt-3 mr-3">
                        <label> Status </label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Status"
                            options={customerPayloads.status}
                            value={status}
                            optionLabel="name"
                            onChange={(e) => {
                                setStatus(e.value);
                                dispatch(setPaginate({
                                    ...paginateParams,
                                    filter: "status",
                                    value: e.value.code
                                }));
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="w-full p-3">
                    <DataTable
                        dataKey="id"
                        size="small"
                        value={customers}
                        sortField={paginateParams.order}
                        sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No customer found."
                        globalFilterFields={customerPayloads.columns}
                        sortMode={paginateOptions.sortMode}
                        header={<HeaderRender />}
                        footer={<FooterRender />}
                    >
                        {showColumns.current.map((col) => {
                            return (
                                <Column
                                    className="table-column"
                                    key={col.field}
                                    style={{ minWidth: "250px" }}
                                    field={col.field}
                                    header={col.header}
                                    sortable={col.sortable}
                                    body={(value) => {
                                        switch (col.field) {
                                            case "name":
                                                return (<ColumnNavigate url={`${paths.CUSTOMER_LIST}/${value['id']}`} value={value[col.field]} />);
                                            case "status":
                                                return <ColumnStatus status={value[col.field]} />;
                                            case "created_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "updated_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case 'dob':
                                                return ( moment(value[col.field]).format("DD-MM-YYYY"));
                                            case 'fees':
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case 'balance':
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case 'deposit_amount':
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case 'pink_card':
                                                return (<ColumnStatus status={value[col.field]} />);
                                            case 'employer':
                                                return (<ColumnStatus status={value[col.field]} />);
                                            case 'employer_type':
                                                return (<ColumnStatus status={value[col.field]} />);
                                            case 'employer_company_data':
                                                return (<a href={value[col.field]} target="blank"> View Company Data </a>)
                                            case 'option':
                                                return (
                                                    <div className="">
                                                        <Button 
                                                            size="small"
                                                            outlined
                                                            label="Add Employer Information"
                                                            onClick={() => {
                                                                setShow(true);
                                                                setPayload(value);
                                                                setData(value);
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            default:
                                                return value[col.field];
                                        }
                                    }}
                                />
                            )
                        })}
                    </DataTable>

                    <Paginator
                        first={first.current}
                        rows={paginateParams.rows}
                        totalRecords={total.current}
                        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                        template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                        onPageChange={onPageChange}
                    />
            </div>


            <Dialog header="Employer Information" visible={show} style={{ width: '50vw' }} onHide={() => {if (!show) return; setShow(false); }}>
                <div className="grid">
                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Choose Employer (required) </label>
                            <Dropdown
                                className="w-full mt-1"
                                placeholder="Choose Employer"
                                options={categoryTypes.current}
                                value={payload.employer}
                                optionLabel="name"
                                onChange={(e) => payloadHandler(payload, e.value, "employer", async (updatePayload) => {
                                    const response = await settingServices.serviceIndex(dispatch, { filter: "category_id", value: e.value.code});
                                    if(response.status === 200) {
                                        serviceTypes.current = response.data.map((value) => {
                                            return {
                                                code: value.id,
                                                name: value.service_type,
                                                fees: value.fees
                                            }
                                        })
                                    }

                                    if( serviceTypes.current.length > 0) {
                                        updatePayload.fees =serviceTypes.current[0].fees;
                                        updatePayload.year_of_insurance = serviceTypes.current[0];
                                    } else {
                                        updatePayload.fees = 0;
                                        updatePayload.deposit_amount = 0;
                                        updatePayload.balance = 0;
                                    }

                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="employer" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Choose Employer Type</label>
                            <Dropdown
                                className="w-full mt-1"
                                placeholder="Choose Employer Type"
                                options={customerPayloads.employerTypes}
                                value={payload.employer_type}
                                optionLabel="name"
                                onChange={(e) => payloadHandler(payload, e.value, "employer_type", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="employer_type" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label>  Pink Card (required)</label>
                            <Dropdown
                                className="w-full mt-1"
                                placeholder="Choose Pink Card Type"
                                options={customerPayloads.pinkCards}
                                value={payload.pink_card}
                                optionLabel="name"
                                onChange={(e) => payloadHandler(payload, e.value, "pink_card", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="pink_card" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Employer Photo (Optional) </label>
                            <InputText 
                                type="file"
                                className="w-full"
                                placeholder="Enter Employer Photo"
                                disabled={loading}
                                value={employerPhoto}
                                onChange={(e) => payloadHandler(payload, e.target.files[0], "employer_photo", (updatePayload) => {
                                    setEmployerPhoto(e.target.value);
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="employer_photo" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Employer Household List Photo (Optional) </label>
                            <InputText 
                                type="file"
                                className="w-full mt-1"
                                placeholder="Enter Employer Household Photo"
                                disabled={loading}
                                value={employerHouseHoldPhoto}
                                onChange={(e) => payloadHandler(payload, e.target.files[0], "employer_household_photo", (updatePayload) => {
                                    setEmployerHouseholdPhoto(e.target.value);
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="employer_household_photo" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Employer Company Data Link (Drive Link) </label>
                            <InputText 
                                className="w-full mt-1"
                                placeholder="Enter Employer Company Data Link"
                                disabled={loading}
                                value={payload.employer_company_data}
                                onChange={(e) => payloadHandler(payload, e.target.value, "employer_company_data", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="employer_company_data" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                                <label> Choose Service </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Service"
                                    options={serviceTypes.current ? serviceTypes.current : []}
                                    value={payload.year_of_insurance}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "year_of_insurance", (updatePayload) => {
                                        updatePayload.fees = e.value.fees;
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="year_of_insurance" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Service Fee </label>
                            <InputText 
                                className="w-full mt-1"
                                disabled={true}
                                value={payload.fees}
                                onChange={(e) => payloadHandler(payload, e.target.value, "fees", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="fees" />
                    </div> 

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Deposit </label>
                            <InputText 
                                className="w-full mt-1"
                                disabled={loading}
                                value={payload.deposit_amount}
                                onChange={(e) => payloadHandler(payload, e.target.value, "deposit_amount", (updatePayload) => {
                                    updatePayload.balance = payload.fees - e.target.value;
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="deposit_amount" />
                    </div>

                    <div className="col-12 md:col-6 mt-3">
                        <div className="w-full">
                            <label> Balance </label>
                            <InputText 
                                className="w-full mt-1"
                                disabled={true}
                                value={payload.balance}
                                onChange={(e) => payloadHandler(payload, e.target.value, "balance", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="balance" />
                    </div>

                    <div className="col-12 mt-3">
                        <Button 
                            outlined
                            label="Update"
                            size="sm"
                            onClick={() => {
                                updateCustomerHandler()
                            }}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    )
}