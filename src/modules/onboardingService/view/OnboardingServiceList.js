import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { ColumnNumber } from "../../../components/table/ColumnNumber";
import { Paginator } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { HeaderTableSearch } from "../../../components/table/HeaderTableSearch";
import { FooterPaginate } from "../../../components/table/FooterPaginate";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { paths } from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import { setOnboardingServicePaginate } from "../onboardingServiceSlice";
import { onboardingServicePayloads } from "../onboardingServicePayloads";
import { onboardingServiceServices } from "../onboardingServiceServices";
import { employerPayloads } from "../../employer/employerPayloads";
import { categoryServices as serviceCategory } from "../../categories/categoryServices";
import { categoryServiceServices } from "../../categoryService/categoryServiceServices";
import { employerServices } from "../../employer/employerServices";

export const OnboardingServiceList = () => {

    const resetFilter = {
        status: "",
        category_id: "",
        category_service_id: "",
        employer_id: "",
        employer_type: ""
    }

    const { onboarding, category, employer, categoryService } = useSelector(state => state);
    const { onboardingServices, onboardingServicePaginateParams } = onboarding;
    const { categories } = category;
    const { employers } = employer;
    const { categoryServices } = categoryService;

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(resetFilter);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(onboardingServicePayloads.onboardingServiceColumns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));


    const filterPayloadHandler = async (key, e) => {
        let updateFilterPayload = {...resetFilter};
        updateFilterPayload[key] = e.value
        setFilter(updateFilterPayload);
        dispatch(setOnboardingServicePaginate({
            filter: key,
            value: e.value.code
        }))
    }

    const onPageChange = async (event) => {
        first.current = event.page * onboardingServicePaginateParams.rows;
        dispatch(setOnboardingServicePaginate({
            ...onboardingServicePaginateParams,
            page: event?.page + 1,
            rows: event?.rows,
        }));
    }

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setOnboardingServicePaginate({
            ...onboardingServicePaginateParams,
            sort: sortOrder,
            order: event.sortField
        }));
    }

    const onSearchChange = (event) => {
        dispatch(setOnboardingServicePaginate({
            ...onboardingServicePaginateParams,
            search: event,
        }));
    }

    const init = useCallback(async () => {
        setLoading(true);
        const response = await onboardingServiceServices.onboardingServiceIndex(dispatch, onboardingServicePaginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, onboardingServicePaginateParams]);

    // const loadingCategory = async () => {
    //     const responseCategoryResponse = 
    //     if(responseCategoryResponse.status === 200) {
    //         categories.current = responseCategoryResponse.data.map((value) => {
    //             return {
    //                 code: value.id,
    //                 name: value.label
    //             }
    //         })
    //     }
    // }

    // const loadingCategoryService = async () => {
    //     if(categoryServiceResponse.status === 200) {
    //         services.current = categoryServiceResponse.data.map((value) => {
    //             return {
    //                 code: value.id,
    //                 name: value.name
    //             }
    //         })
    //     }
    // }

    // const loadingEmployer = async () => {
    //             if(employerResponse.status === 200) {
    //         employers.current = employerResponse.data.map((value) => {
    //             return {
    //                 code: value.id,
    //                 name: value.full_name
    //             }
    //         });
    //     }
    // }

    const mount = useCallback(async () => {
        setLoading(true);
        await employerServices.employerServiceIndex(dispatch, null);
        await categoryServiceServices.categoryServiceIndex(dispatch, {filter: "status", value: "ACTIVE"});
        await serviceCategory.categoryIndex(dispatch, {filter: "status", value: "ACTIVE" });
        setLoading(false);
    }, [dispatch]);


    useEffect(() => {
        mount();
    },[mount]);

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
                            severity="success"
                            label="ADD SERVICE"
                            size="small"
                            onClick={() => navigate(`${paths.ONBOARDING_SERVICE}/create`)}
                            icon="pi pi-plus"
                        />
                    </>
                </div>
                
                <Card className="w-full mt-3">
                    <DataTable
                        dataKey="id"
                        size="large"
                        stripedRows
                        value={onboardingServices}
                        sortField={onboardingServicePaginateParams.order}
                        sortOrder={onboardingServicePaginateParams.sort === 'DESC' ? 1 : onboardingServicePaginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No customer found."
                        globalFilterFields={onboardingServicePayloads.onboardingServiceColumns}
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

                                <div className="col-2">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Employer Type"
                                        options={employerPayloads.employerType}
                                        value={filter.employer_type}
                                        optionLabel="name"
                                        filter
                                        onChange={(e) => filterPayloadHandler("employer_type", e)}
                                    />
                                </div>

                                <div className="col-2">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Category"
                                        options={categories.map((value) => {
                                            return {
                                                code: value.id,
                                                name: value.label
                                            }
                                        })}
                                        optionLabel="name"
                                        value={filter.category_id}
                                        disabled={categories.length > 0 ? false : true}
                                        filter
                                        onChange={(e) => filterPayloadHandler("category_id", e)}
                                    />
                                </div>

                                <div className="col-2">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Category Service"
                                        options={categoryServices.map((value) => {
                                            return {
                                                code: value.id,
                                                name: value.name
                                            }
                                        })}
                                        value={filter.category_service_id}
                                        optionLabel="name"
                                        disabled={categoryServices.length > 0 ? false : true}
                                        filter
                                        onChange={(e) => filterPayloadHandler("category_service_id", e)}
                                    />
                                </div>


                                <div className="col-2">
                                    <Dropdown
                                        className="w-full"
                                        placeholder="Choose Employer"
                                        options={employers.map((value) => {
                                            return {
                                                code: value.id,
                                                name: value.full_name
                                            }
                                        })}
                                        value={filter.employer_id}
                                        optionLabel="name"
                                        filter
                                        disabled={employers.length > 0 ? false : true}
                                        onChange={(e) => filterPayloadHandler("employer_id", e)}
                                    />
                                </div>
                            </div>
                        }
                        footer={
                            <FooterPaginate 
                                total={total.current}  
                                onChangePaginate={() => dispatch(setOnboardingServicePaginate(onboardingServicePayloads.onboardingServicePaginateParams))}
                            />
                        }
                    >
                        {showColumns.current.map((col) => {
                            return (
                                <Column
                                    className="table-column"
                                    key={col.field}
                                    style={col.width ? {minWidth: col.width} : { minWidth: "200px"}}
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
                                            case "balance":
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case "fees":
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case "deposit":
                                                return (<ColumnNumber value={value[col.field]} />);
                                            case 'action':
                                                return (
                                                    <div className="flex flex-row">
                                                        <Button 
                                                            outlined
                                                            className="mr-2"
                                                            severity="primary"
                                                            label="VIEW"
                                                            size="small"
                                                            icon="pi pi-external-link"
                                                            onClick={() => navigate(`${paths.ONBOARDING_SERVICE}/view/${value["id"]}`)}
                                                        />

                                                        <Button 
                                                            outlined
                                                            className="mr-2"
                                                            severity="info"
                                                            label="EDIT"
                                                            size="small"
                                                            icon="pi pi-pen-to-square"
                                                            onClick={() => navigate(`${paths.ONBOARDING_SERVICE}/update/${value["id"]}`)}
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
                        rows={onboardingServicePaginateParams.rows}
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