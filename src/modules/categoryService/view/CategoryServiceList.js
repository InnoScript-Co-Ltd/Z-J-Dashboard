import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryServicePayloads } from "../categoryServicePayloads";
import { categoryServiceServices } from "../categoryServiceServices";
import { categoryServices as serviceCategory } from "../../categories/categoryServices";
import { setCategoryServicePaginate } from "../categoryServiceSlice";
import { generalStatusEnum, paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import numeral from "numeral";
import { Button } from "primereact/button";
import { paths } from "../../../constants/path";
import { FooterPaginate } from "../../../components/table/FooterPaginate";
import { HeaderTableSearch } from "../../../components/table/HeaderTableSearch";
import { Dropdown } from "primereact/dropdown";

export const CategoryServiceList = () => {

    const { categoryServices, categoryServicePaginateParams } = useSelector(state => state.categoryService);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const first = useRef(0);
    const total = useRef(0);
    const categories = useRef([]);
    const columns = useRef(categoryServicePayloads.categoryServiceColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const onPageChange = async (event) => {
        first.current = event.page * categoryServicePaginateParams.rows;
        dispatch(setCategoryServicePaginate({
            ...categoryServicePaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setCategoryServicePaginate({
            ...categoryServicePaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setCategoryServicePaginate({
            ...categoryServicePaginateParams,
            search: event,
        }));
    }

    const onFilter = (column, value) => {
        dispatch(setCategoryServicePaginate({
            filter: column,
            value: value
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);

        const categoryServiceResponse = await categoryServiceServices.categoryServiceIndex(dispatch, categoryServicePaginateParams);
        
        if (categoryServiceResponse.status === 200) {
            const { data } = categoryServiceResponse;
            total.current = data.total ? data.total : data.length;
        }

        setLoading(false);
    }, [dispatch, categoryServicePaginateParams]);

    const mount = useCallback(async () => {
        setLoading(true);
        const categoryResponse = await serviceCategory.categoryIndex(dispatch, {filter: "status", value: "ACTIVE"});
        if(categoryResponse.status === 200) {
            categories.current = categoryResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.label
                }
            });
        }
        setLoading(false);
    },[dispatch]);

    useEffect(() => {
        init();

        return () => { }
    },[init]);

    useEffect(() => {
        mount();
    }, [mount]);

    return (
        <div className="w-full p-3">
            <DataTable
                dataKey="id"
                size="large"
                value={categoryServices}
                sortField={categoryServicePaginateParams.order}
                sortOrder={categoryServicePaginateParams.sort === 'DESC' ? 1 : categoryServicePaginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                loading={loading}
                emptyMessage="No Category Service Found."
                globalFilterFields={categoryServicePayloads.categoryServiceColumns}
                sortMode={paginateOptions.sortMode}
                header={ 
                    <div className="grid">
                        <div className="col-3">
                            <HeaderTableSearch 
                                disabled={loading}
                                placeholder={"Search Category Service"}
                                onSearch={(e) => onSearchChange(e)}
                            />
                        </div>

                        <div className="col-3">
                            <Dropdown 
                                className="w-full mt-1"
                                placeholder="Choose Category Service Status"
                                options={generalStatusEnum}
                                value={status}
                                optionLabel="name"
                                onChange={(e) => {
                                    setStatus(e.value);
                                    onFilter("status", e.value.code)
                                }}
                            />
                        </div>

                        <div className="col-3">
                            <Dropdown 
                                className="w-full mt-1"
                                placeholder="Choose Service Category"
                                options={categories.current}
                                value={categoryId}
                                optionLabel="name"
                                onChange={(e) => {
                                    setCategoryId(e.value);
                                    onFilter("category_id", e.value.code)
                                }}
                            />
                        </div>
                    </div>
                }
                footer={
                    <FooterPaginate 
                        total={total.current}  
                        onChangePaginate={() => dispatch(setCategoryServicePaginate(categoryServicePayloads.categoryServicePaginateParams))}
                    />
                }
            >
            
            {showColumns.current.map((col) => {
                return (
                    <Column
                        className="table-column"
                        key={col.field}
                        style={{ minWidth:col.width ? col.width : "250px" }}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        body={(value) => {
                            switch (col.field) {
                                case "category":
                                    return (<span> {value[col.field].label} </span>)
                                case "fees":
                                    return (<span> {numeral(value[col.field]).format("0,0")} Baht </span>)
                                case "status":
                                    return <ColumnStatus status={value[col.field]} />;
                                case "created_at":
                                    return (<ColumnDate value={value[col.field]} />);
                                case "updated_at":
                                    return (<ColumnDate value={value[col.field]} />);
                                case "action":
                                    return(
                                        <>
                                            <Button 
                                                outlined
                                                severity="info"
                                                label="VIEW"
                                                size="small"
                                                icon="pi pi-pen-to-square"
                                                onClick={() => navigate(`${paths.CATEGORY_SERVICE}/${value["id"]}`)}
                                            />
                                        </>
                                    )
                                default:
                                    return value[col.field];
                            }
                        }}
                    />
                )})}
            </DataTable>

            <Paginator
                first={first.current}
                rows={categoryServicePaginateParams.rows}
                totalRecords={total.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </div>
    )
}