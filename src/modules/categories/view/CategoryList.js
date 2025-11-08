import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from "primereact/paginator";
import { categoryServices } from "../categoryServices";
import { categoryPayloads } from "../categoryPayloads";
import { generalStatusEnum, paginateOptions } from "../../../constants/settings";
import { setCategoryPaginate } from "../categorySlice";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { FooterPaginate } from "../../../components/table/FooterPaginate";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/path";
import { HeaderTableSearch } from "../../../components/table/HeaderTableSearch";
import { Dropdown } from "primereact/dropdown";

export const CategoryList = () => {

    const { categories, categoryPaginateParams } = useSelector(state => state.category);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(categoryPayloads.categoryColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * categoryPaginateParams.rows;
        dispatch(setCategoryPaginate({
            ...categoryPaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setCategoryPaginate({
            ...categoryPaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setCategoryPaginate({
            ...categoryPaginateParams,
            search: event,
        }));
    }

    const onFilter = (column, value) => {
        dispatch(setCategoryPaginate({
            filter: column,
            value: value
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);

        const categoryIndexResponse = await categoryServices.categoryIndex(dispatch, categoryPaginateParams);
        
        if (categoryIndexResponse.status === 200) {
            const { data } = categoryIndexResponse;
            total.current = data.total ? data.total : data.length;
        }

        setLoading(false);
    }, [dispatch, categoryPaginateParams]);

    useEffect(() => {
        init();

        return () => { }
    },[init]);

    return(
        <div className="w-full p-3">
            <DataTable
                dataKey="id"
                    size="large"
                    value={categories}
                    sortField={categoryPaginateParams.order}
                    sortOrder={categoryPaginateParams.sort === 'DESC' ? 1 : categoryPaginateParams.sort === 'ASC' ? -1 : 0}
                    onSort={onSort}
                    loading={loading}
                    emptyMessage="No categories found."
                    globalFilterFields={categoryPayloads.categoryColumns}
                    sortMode={paginateOptions.sortMode}
                    header={ 
                        <div className="grid">
                            <div className="col-3">
                                <HeaderTableSearch 
                                    disabled={loading}
                                    placeholder={"Search Category"}
                                    onSearch={(e) => onSearchChange(e)}
                                />
                            </div>

                            <div className="col-3">
                                <Dropdown 
                                    className="w-full mt-1"
                                    placeholder="Choose Category Status"
                                    options={generalStatusEnum}
                                    value={status}
                                    optionLabel="name"
                                    onChange={(e) => {
                                        setStatus(e.value);
                                        onFilter("status", e.value.code)
                                    }}
                                />
                            </div>
                        </div>
                    }
                    footer={
                        <FooterPaginate 
                            total={total.current}  
                            onChangePaginate={() => dispatch(setCategoryPaginate(categoryPayloads.categoryPaginateParams))}
                        />
                    }
                >
                
                {showColumns.current.map((col) => {
                    return (
                        <Column
                            className="table-column"
                            key={col.field}
                            style={{ minWidth: col.width ? col.width : "250px" }}
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
                                    case "action":
                                        return (
                                            <Button 
                                                outlined
                                                severity="info"
                                                label="VIEW"
                                                size="small"
                                                icon="pi pi-pen-to-square"
                                                onClick={() => navigate(`${paths.CATEGORY}/${value["id"]}`)}
                                            />
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
                rows={categoryPaginateParams.rows}
                totalRecords={total.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </div>
    )
}