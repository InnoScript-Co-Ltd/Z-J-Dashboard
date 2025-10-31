import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { paths } from "../../../constants/path";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnNavigate } from "../../../components/table/ColumnNavigate";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { TableSearch } from "../../../components/table/TableSearch";
import { settingPayloads } from "../settingPayloads";
import { setServicePaginate } from "../settingSlice";
import { settingServices } from "../settingServices";
import numeral from "numeral";

export const ServiceList = () => {

    const [loading, setLoading] = useState(false);
    const { services, servicePaginateParams } = useSelector(state => state.setting);

    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(settingPayloads.serviceColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * servicePaginateParams.rows;
        dispatch(setServicePaginate({
            ...servicePaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setServicePaginate({
            ...servicePaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setServicePaginate({
            ...servicePaginateParams,
            search: event,
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        dispatch(setServicePaginate(servicePaginateParams));
        const response = await settingServices.serviceIndex(dispatch, servicePaginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, servicePaginateParams]);

    useEffect(() => {
        init();
    }, [init])

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
                            dispatch(setServicePaginate(settingServices.servicePaginateParams));
                        }}
                    />
                </div>
            </div>
        )
    }

    const HeaderRender = () => {
        return (
            <div className="grid">
                <div className="col-3">
                    <TableSearch
                        tooltipLabel={settingPayloads.serviceColumns}
                        placeholder={"Search Service"}
                        onSearch={(e) => onSearchChange(e)}
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <ConfirmDialog />
            <div className="w-full p-3">
                <DataTable
                    dataKey="id"
                        size="small"
                        value={services}
                        sortField={servicePaginateParams.order}
                        sortOrder={servicePaginateParams.sort === 'DESC' ? 1 : servicePaginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No service found."
                        globalFilterFields={settingPayloads.serviceColumns}
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
                                            case "service_type":
                                                return (<ColumnNavigate url={`${paths.SETTING}/service/${value['id']}`} value={value[col.field]} />);
                                            case "fees":
                                                return (<span> {numeral(value[col.field]).format("0,0")} Baht </span>)
                                            case "status":
                                                return <ColumnStatus status={value[col.field]} />;
                                            case "created_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "updated_at":
                                                return (<ColumnDate value={value[col.field]} />);
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
                    rows={servicePaginateParams.rows}
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