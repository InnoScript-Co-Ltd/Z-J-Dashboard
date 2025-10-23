import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { HeaderBar } from "../../../components/HeaderBar"
import { useNavigate } from "react-router-dom"
import { paths } from "../../../constants/path"
import { useCallback, useEffect, useRef, useState } from "react";
import { resellerServices } from "../resellerServices";
import { useDispatch, useSelector } from "react-redux";
import { resellerPayloads } from "../resellerPayload";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnNavigate } from "../../../components/table/ColumnNavigate";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { setPaginate } from "../resellerSlice";
import { TableSearch } from "../../../components/table/TableSearch";
import { BackButton } from "../../../components/BackButton";

export const ResellerList = () => {

    const [loading, setLoading] = useState(false);
    const { resellers, paginateParams } = useSelector(state => state.reseller);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(resellerPayloads.columns);
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
        const response = await resellerServices.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        init();
    }, [init])

    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div> Total - <span>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(resellerPayloads.paginateParams));
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
                        tooltipLabel={resellerPayloads.columns}
                        placeholder={"Search Reseller Account"}
                        onSearch={(e) => onSearchChange(e)}
                    />
                </div>
            </div>
        )
    }


    return (
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
                
                <div className="flex flex-row justify-content-start align-items-center">
                    <Button 
                        size="small"
                        label="Create Reseller Account"
                        icon="pi pi-plus-circle"
                        onClick={() => navigate(paths.RESELLER_CREATE)}
                    />
                </div>
            </div>

            <div className="w-full p-3">
                <Card
                    title="Reseller List"
                    subTitle="Overview of all resellers with contact, sales, and performance information."
                >
                    <DataTable
                        dataKey="id"
                        size="small"
                        value={resellers}
                        sortField={paginateParams.order}
                        sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No reseller found."
                        globalFilterFields={resellerPayloads.columns}
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
                                    sortable
                                    body={(value) => {
                                        switch (col.field) {
                                            case "name":
                                                return (<ColumnNavigate url={`${paths.RESELLER_LIST}/${value['id']}`} value={`${value.first_name + " " + value.last_name}`} />);
                                            case "status":
                                                return <ColumnStatus status={value[col.field]} />;
                                            case "created_at":
                                                return (<ColumnDate value={value[col.field]} />);
                                            case "updated_at":
                                                return (<ColumnDate value={value[col.field]} />)
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
                </Card>
            </div>
        </>
    )
}