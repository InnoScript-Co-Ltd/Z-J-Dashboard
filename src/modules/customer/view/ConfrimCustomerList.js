import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { paths } from "../../../constants/path";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
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

export const ConfirmCustomerList = () => {

    const [loading, setLoading] = useState(false);
    const { customers, paginateParams } = useSelector(state => state.customer);

    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(customerPayloads.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

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
        dispatch(setPaginate(paginateParams));
        const response = await customerServices.index(dispatch, {...paginateParams, search: ""});
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    const restoreDialogBox = async (id) => {
        confirmDialog({
            message: 'Do you want to restore this record?',
            header: 'Restore Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                const response = await customerServices.restore(dispatch, id);
                if(response.status === 200) {
                    init();
                }
            },
            reject: ()  => {}
        });
    };

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
                            dispatch(setPaginate(customerServices.paginateParams));
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
                        tooltipLabel={customerPayloads.columns}
                        placeholder={"Search Customer"}
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
                                            case 'deleted_at':
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "option":
                                                return (
                                                    <Button
                                                        outlined
                                                        size="small"
                                                        label="Restore"
                                                        severity="success"
                                                        icon="pi pi-check"
                                                        onClick={async () => restoreDialogBox(value['id'])}
                                                    />
                                                );
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