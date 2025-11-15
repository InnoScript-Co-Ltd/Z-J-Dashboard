import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { HeaderTableSearch } from "../../../components/table/HeaderTableSearch";
import { FooterPaginate } from "../../../components/table/FooterPaginate";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { paths } from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import { employerPayloads } from "../employerPayloads";
import { employerServices } from "../employerServices";
import { setEmployerPaginate } from "../employerSlice";

export const EmployerList = () => {

    const { employers, employerPaginateParams } = useSelector(state => state.employer);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(employerPayloads.employerColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * employerPaginateParams.rows;
        dispatch(setEmployerPaginate({
            ...employerPaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setEmployerPaginate({
            ...employerPaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setEmployerPaginate({
            ...employerPaginateParams,
            search: event,
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await employerServices.employerServiceIndex(dispatch, employerPaginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, employerPaginateParams]);

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
                            onClick={() => navigate(`${paths.EMPLOYER}/create`)}
                        />
                    </>
                </div>
                
                <Card className="w-full mt-3">
                    <DataTable
                        dataKey="id"
                        size="large"
                        value={employers}
                        sortField={employerPaginateParams.order}
                        sortOrder={employerPaginateParams.sort === 'DESC' ? 1 : employerPaginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No customer found."
                        globalFilterFields={employerPayloads.employerColumns}
                        sortMode={paginateOptions.sortMode}
                        header={
                            <div className="grid">
                                <div className="col-3">
                                    <HeaderTableSearch 
                                        disabled={loading}
                                        placeholder={"Search Employer"}
                                        onSearch={(e) => onSearchChange(e)}
                                    />
                                </div>

                                <div className="col-3">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Employer Type"
                                        options={employerPayloads.employerType}
                                        value={status}
                                        optionLabel="name"
                                        onChange={(e) => {
                                            setStatus(e.value);
                                            dispatch(setEmployerPaginate({
                                                ...employerPaginateParams,
                                                filter: "employer_type",
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
                                onChangePaginate={() => dispatch(setEmployerPaginate(employerPayloads.employerPaginateParams))}
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
                                            case "employer_status":
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
                                                            severity="primary"
                                                            label="VIEW"
                                                            size="small"
                                                            icon="pi pi-plus-circle"
                                                            onClick={() => navigate(`${paths.EMPLOYER}/view/${value["id"]}`)}
                                                        />

                                                        <Button 
                                                            outlined
                                                            severity="info"
                                                            label="EDIT"
                                                            size="small"
                                                            icon="pi pi-pen-to-square"
                                                            onClick={() => navigate(`${paths.EMPLOYER}/update/${value["id"]}`)}
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
                        rows={employerPaginateParams.rows}
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