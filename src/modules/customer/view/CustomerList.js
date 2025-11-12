import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { setCustomerPaginate } from "../customerSlice";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Dropdown } from "primereact/dropdown";
import { HeaderTableSearch } from "../../../components/table/HeaderTableSearch";
import { FooterPaginate } from "../../../components/table/FooterPaginate";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { paths } from "../../../constants/path";
import { useNavigate } from "react-router-dom";

export const CustomerList = () => {

    const { customers, customerPaginateParams } = useSelector(state => state.customer);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(customerPayloads.customerColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * customerPaginateParams.rows;
        dispatch(setCustomerPaginate({
            ...customerPaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setCustomerPaginate({
            ...customerPaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setCustomerPaginate({
            ...customerPaginateParams,
            search: event,
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await customerServices.customerIndex(dispatch, customerPaginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, customerPaginateParams]);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <>
            <HeaderBar />
            <div className="w-full p-3">
                <div className="flex flex-row justify-content-between align-items-center mt-3">
                    <BackButton />

                    <>
                        <Button 
                            outlined
                            label="CREATE"
                            size="small"
                            onClick={() => navigate(paths.CUSTOMER_CREATE)}
                        />
                    </>
                </div>
                
                <Card className="w-full mt-3">
                    <DataTable
                        dataKey="id"
                        size="large"
                        value={customers}
                        sortField={customerPaginateParams.order}
                        sortOrder={customerPaginateParams.sort === 'DESC' ? 1 : customerPaginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No customer found."
                        globalFilterFields={customerPayloads.customerColumns}
                        sortMode={paginateOptions.sortMode}
                        header={
                            <div className="grid">
                                <div className="col-3">
                                    <HeaderTableSearch 
                                        disabled={loading}
                                        placeholder={"Search Customer"}
                                        onSearch={(e) => onSearchChange(e)}
                                    />
                                </div>

                                <div className="col-3">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Customer Status"
                                        options={customerPayloads.customerStatus}
                                        value={status}
                                        optionLabel="name"
                                        onChange={(e) => {
                                            setStatus(e.value);
                                            dispatch(setCustomerPaginate({
                                                ...customerPaginateParams,
                                                filter: "status",
                                                value: e.value.code
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        footer={
                            <FooterPaginate 
                                total={total.current}  
                                onChangePaginate={() => dispatch(setCustomerPaginate(customerPayloads.customerPaginateParams))}
                            />
                        }
                    >
                        {showColumns.current.map((col) => {
                            return (
                                <Column
                                    className="table-column"
                                    key={col.field}
                                    style={col.width ? {width: col.width} : { width: "250px"}}
                                    field={col.field}
                                    header={col.header}
                                    sortable={col.sortable}
                                    body={(value) => {
                                        switch (col.field) {
                                            case "status":
                                                return <ColumnStatus status={value[col.field]} />;
                                            case "created_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "updated_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case 'action':
                                                return (
                                                    <div className="flex flex-row">
                                                        <Button 
                                                            outlined
                                                            className="mr-2"
                                                            severity="success"
                                                            label="ADD SERVICE"
                                                            size="small"
                                                            icon="pi pi-plus-circle"
                                                            onClick={() => navigate(`${paths.ONBOARDING_SERVICE}/create/${value["id"]}`)}
                                                        />

                                                        <Button 
                                                            outlined
                                                            severity="info"
                                                            label="EDIT"
                                                            size="small"
                                                            icon="pi pi-pen-to-square"
                                                            onClick={() => navigate(`${paths.CUSTOMER_LIST}/${value["id"]}`)}
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
                        rows={customerPaginateParams.rows}
                        totalRecords={total.current}
                        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                        template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                        onPageChange={onPageChange}
                    />
                </Card>
            </div>
        </>
    )
}