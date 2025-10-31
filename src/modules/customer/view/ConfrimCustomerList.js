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
import moment from "moment";

export const ConfirmCustomerList = () => {

    const { customers, paginateParams } = useSelector(state => state.customer);
    const { services } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [employer, setEmployer] = useState("");
    const [employerType, setEmployerType] = useState("");
    const [pinkCard, setPinkCard] = useState("");
    const [contactBy, setContactBy] = useState("");
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(customerPayloads.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const serviceTypes = useRef([]);

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
                    code: value.service_type,
                    name: value.service_type
                }
            })
        }
    }, [services]);

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
                        <label> Filter By Employeer</label>
                        <Dropdown
                            className="w-full mt-1"
                            placeholder="Choose Employeer"
                            options={customerPayloads.employer}
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
        </>
    )
}