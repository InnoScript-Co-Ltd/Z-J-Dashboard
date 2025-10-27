import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { HeaderBar } from "../../../components/HeaderBar"
import { useNavigate } from "react-router-dom"
import { paths } from "../../../constants/path"
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visaServicePayloads } from "../visaServicePayload";
import { paginateOptions } from "../../../constants/settings";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import { ColumnNavigate } from "../../../components/table/ColumnNavigate";
import { ColumnDate } from "../../../components/table/ColumnDate";
import { Paginator } from "primereact/paginator";
import { setPaginate } from "../visaServiceSlice";
import { TableSearch } from "../../../components/table/TableSearch";
import { BackButton } from "../../../components/BackButton";
import { visaServiceServices } from "../visaServiceServices";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import defaultImage from "../../../assets/images/default.webp";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export const VisaServiceList = () => {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [visaType, setVisaType] = useState("");

    const { visaServices, paginateParams } = useSelector(state => state.visaService);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(visaServicePayloads.columns);
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
        const response = await  visaServiceServices.index(dispatch, paginateParams);
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
            <div className='flex items-center justify-content-between'>
                <div> Total - <span>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(visaServicePayloads.paginateParams));
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
                        placeholder={"Search Visa Services"}
                        onSearch={(e) => onSearchChange(e)}
                    />
                </div>

                <div className="col-12">
                    <Dropdown
                        className="mr-3"
                        placeholder={"Status"}
                        options={visaServicePayloads.statusTypes}
                        optionLabel="name"
                        value={status}
                        onChange={ (e) => {
                            setStatus(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.filter = "status";
                            updatePaginate.value = e.value ? e.value.code : "";

                            dispatch(setPaginate(updatePaginate));
                        }}
                    />

                    <Dropdown
                        className="mr-3"
                        placeholder={"Service Type"}
                        options={visaServicePayloads.serviceTypes}
                        optionLabel="name"
                        value={serviceType}
                        onChange={ (e) => {
                            setServiceType(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.filter = "service_type";
                            updatePaginate.value = e.value ? e.value.code : "";

                            dispatch(setPaginate(updatePaginate));
                        }}
                    />

                    <Dropdown
                        className="mr-3"
                        placeholder={"Visa Type"}
                        options={visaServicePayloads.visaTypes}
                        optionLabel="name"
                        value={visaType}
                        onChange={ (e) => {
                            setVisaType(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.filter = "visa_type";
                            updatePaginate.value = e.value ? e.value.code : "";

                            dispatch(setPaginate(updatePaginate));
                        }}
                    />

                    <Calendar 
                        className="mr-3"
                        placeholder="Appointment Date"
                        value={appointmentDate}
                        onChange={ (e) => {
                            setAppointmentDate(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.date_filter = "appointment_date";

                            let start_date = new Date(e.value).toLocaleDateString('en-CA');
                            let end_date = new Date(e.value).toLocaleDateString('en-CA');

                            updatePaginate.start_date = start_date;
                            updatePaginate.end_date = end_date;

                            dispatch(setPaginate(updatePaginate));
                        }} 
                        dateFormat="yy-mm-dd"
                        showIcon
                    />

                    <Calendar 
                        className="mr-3"
                        placeholder="Visa Entry Date"
                        value={appointmentDate}
                        onChange={ (e) => {
                            setAppointmentDate(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.date_filter = "visa_entry_date";

                            let start_date = new Date(e.value).toLocaleDateString('en-CA');
                            let end_date = new Date(e.value).toLocaleDateString('en-CA');

                            updatePaginate.start_date = start_date;
                            updatePaginate.end_date = end_date;

                            dispatch(setPaginate(updatePaginate));
                        }} 
                        dateFormat="yy-mm-dd"
                        showIcon
                    />

                    <Calendar 
                        className="mr-3"
                        placeholder="Visa Expired Date"
                        value={appointmentDate}
                        onChange={ (e) => {
                            setAppointmentDate(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.date_filter = "visa_expiry_date";

                            let start_date = new Date(e.value).toLocaleDateString('en-CA');
                            let end_date = new Date(e.value).toLocaleDateString('en-CA');

                            updatePaginate.start_date = start_date;
                            updatePaginate.end_date = end_date;

                            dispatch(setPaginate(updatePaginate));
                        }} 
                        dateFormat="yy-mm-dd"
                        showIcon
                    />

                    <Calendar 
                        className="mr-3"
                        placeholder="New Visa Expired Date"
                        value={appointmentDate}
                        onChange={ (e) => {
                            setAppointmentDate(e.value);

                            let updatePaginate = {...paginateParams};
                            updatePaginate.date_filter = "new_visa_expired_date";

                            let start_date = new Date(e.value).toLocaleDateString('en-CA');
                            let end_date = new Date(e.value).toLocaleDateString('en-CA');

                            updatePaginate.start_date = start_date;
                            updatePaginate.end_date = end_date;

                            dispatch(setPaginate(updatePaginate));
                        }} 
                        dateFormat="yy-mm-dd"
                        showIcon
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
                        label="Create Visa Service"
                        icon="pi pi-plus-circle"
                        onClick={() => navigate(paths.VISA_SERVICE_CREATE)}
                    />
                </div>
            </div>

            <div className="w-full p-3">
                <Card
                    title="Visa Service List"
                >
                    <DataTable
                        dataKey="id"
                        size="small"
                        value={visaServices}
                        sortField={paginateParams.order}
                        sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No visa services found."
                        globalFilterFields={visaServicePayloads.columns}
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
                                                return (<ColumnNavigate url={`${paths.VISA_SERVICE_LIST}/${value['id']}`} value={value[col.field]} />);
                                            case "passport_image":
                                                return (
                                                    <Image
                                                        preview
                                                        src={value.passport_image ? `${endpoints.image}/${value.passport_image}` : defaultImage}
                                                        alt={value.name}
                                                        width={80}
                                                        height={80}
                                                        style={{ objectFit: "cover", borderRadius: "4px" }}
                                                    />
                                                );
                                            case "visa_entry_date":
                                                return <span> { value.visa_entry_date ? new Date(value.visa_entry_date).toLocaleDateString() : "--"}</span>;
                                            case "visa_expiry_date":
                                                return <span> { value.visa_expiry_date ? new Date(value.visa_expiry_date).toLocaleDateString() : "--"}</span>;
                                            case "appointment_date":
                                                return <span> { value.appointment_date ? new Date(value.appointment_date).toLocaleDateString() : "--"}</span>;
                                            case "new_visa_expired_date":
                                                return <span> { value.new_visa_expired_date ? new Date(value.new_visa_expired_date).toLocaleDateString() : "--"}</span>;
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