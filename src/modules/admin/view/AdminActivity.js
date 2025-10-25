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
import { adminPayloads } from "../adminPayloads";
import { setActivityPaginate, setPaginate } from "../adminSlice";
import { adminServices } from "../adminService";
import { useParams } from "react-router-dom";
import { Badge } from "primereact/badge";
import { InputSwitch } from "primereact/inputswitch";

export const AdminActivity = () => {

    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState(null);

    const { activities, activityPaginateParams } = useSelector(state => state.admin);

    const dispatch = useDispatch();
    const params = useParams();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(adminPayloads.activityColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * activityPaginateParams.rows;
        dispatch(
            setPaginate({
                ...activityPaginateParams,
                page: event?.page + 1,
                rows: event?.rows,
            })
        );
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setPaginate({
            ...activityPaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await adminServices.activities(dispatch, {...activityPaginateParams, search: params.id});
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, activityPaginateParams,]);

    const delDialogBox = async (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                const response = await adminServices.destroy(dispatch, id);
                if(response.status === 200) {
                    init();
                }
            },
            reject: ()  => {}
        });
    };

    useEffect(() => {
        init();
    }, [init]);

    const FooterRender = () => {
        return (
            <div className='flex items-center justify-content-between'>
                <div> Total - <span>{total ? total.current : 0}</span></div>
                <div className='flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setActivityPaginate(adminPayloads.activityPaginateParams));
                        }}
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
                        value={activities}
                        sortField={activityPaginateParams.order}
                        sortOrder={activityPaginateParams.sort === 'DESC' ? 1 : activityPaginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No admin activities log found."
                        globalFilterFields={adminPayloads.activityColumns}
                        sortMode={paginateOptions.sortMode}
                        selection={selectedRows} 
                        onSelectionChange={(e) => setSelectedRows(e.value)}
                        footer={<FooterRender />}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
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
                                            case "action":
                                                return <Badge value={value[col.field]} />;
                                            case "created_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "updated_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "option":
                                                return (
                                                    <Button
                                                        outlined
                                                        size="small"
                                                        label="Delete"
                                                        severity="danger"
                                                        icon="pi pi-trash"
                                                        onClick={async () => delDialogBox(value['id'])}
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
                        rows={activityPaginateParams.rows}
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