import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { adminPayloads } from "../adminPayloads";
import { setActivityPaginate } from "../adminSlice";
import { adminServices } from "../adminService";
import { useParams } from "react-router-dom";
import { Badge } from "primereact/badge";
import { Calendar } from 'primereact/calendar';

export const AdminActivity = () => {

    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState(null);
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);

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
            setActivityPaginate({
                ...activityPaginateParams,
                page: event?.page + 1,
                rows: event?.rows,
            })
        );
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";

        dispatch(setActivityPaginate({
            ...activityPaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const filterByDateHandler = async () => {
        let start_date = startDate ? new Date(startDate).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA');
        let end_date = endDate ? new Date(endDate).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA');

        dispatch(setActivityPaginate({
            ...activityPaginateParams,
            start_date: start_date,
            end_date: end_date,
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await adminServices.activities(dispatch, {
            ...activityPaginateParams, 
            search: params.id,
        });
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, activityPaginateParams,]);

    const multipleDeleteDialogBox = async (id) => {
        confirmDialog({
            message: 'Do you want to delete this selected records?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                const ids = selectedRows.map(row => row.id);
                const response = await adminServices.activitieRecordDelete(dispatch, { ids: ids });
                if(response.status === 200) {
                    init();
                    setSelectedRows(null);
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
            <div className="grid">
                <div className="col-12 md:col-4 lg:col-3">
                    <Calendar 
                        className="w-full"
                        value={startDate} 
                        onChange={(e) => setStartDate(e.value)} 
                        selectionMode="single" 
                        readOnlyInput 
                        hideOnRangeSelection 
                        placeholder="Select Start Date"
                        dateFormat="yy-mm-dd"
                        maxDate={endDate ? endDate : new Date()}
                        showIcon
                    />
                </div>

                <div className="col-12 md:col-4 lg:col-3">
                    <Calendar 
                        className="w-full"
                        value={endDate} 
                        onChange={(e) => setEndDate(e.value)} 
                        selectionMode="single" 
                        readOnlyInput 
                        hideOnRangeSelection 
                        placeholder="Select End Date"
                        dateFormat="yy-mm-dd"
                        maxDate={new Date()}
                        showIcon
                    />
                </div>
                
                <div className="col-12 md:col-4 lg:col-3">
                    <Button
                        label="Filter" 
                        icon="pi pi-filter" 
                        onClick={filterByDateHandler} 
                    />
                </div>
            </div>

            <div className="grid mt-3">
                {
                    selectedRows && selectedRows.length > 0 &&
                    <div className="col-12 mt-3">
                        <div className="w-full flex flex-row justify-content-end align-items-center">
                            <Button 
                                outlined
                                label={`${selectedRows.length} records are ready to be deleted`} 
                                icon="pi pi-trash" 
                                severity="danger" 
                                size="small"
                                onClick={() => {
                                    multipleDeleteDialogBox();
                                }}
                            />
                        </div>
                    </div>  
                }

                <div className="col-12">
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
                        onSelectionChange={(e) => {
                            setSelectedRows(e.value);
                            console.log(e.value);
                        }}
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
            </div>
        </>
    )
}