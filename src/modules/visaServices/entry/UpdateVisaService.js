import { Card } from "primereact/card"
import { HeaderBar } from "../../../components/HeaderBar"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { payloadHandler } from "../../../utilities/handlers"
import { useDispatch, useSelector } from "react-redux"
import { ValidationMessage } from "../../../components/ValidationMessage"
import { Dropdown } from "primereact/dropdown"
import { updateError } from "../../shareSlice"
import { BackButton } from "../../../components/BackButton";
import { visaServicePayloads } from "../visaServicePayload"
import { Calendar } from "primereact/calendar"
import { visaServiceServices } from "../visaServiceServices"
import { paths } from "../../../constants/path"
import { Image } from "primereact/image"
import { endpoints } from "../../../constants/endpoints"
import defaultImage from "../../../assets/images/default.webp";

export const UpdateVisaService = () => {

    const { visaService } = useSelector(state => state.visaService);

    const [payload, setPayload] = useState(visaServicePayloads.createOrUpdate);
    const [passportImage, setPassportImage] = useState("");
    const [addDate, setAddDate] = useState(60);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const updateVisaServiceHandler = async () => {
        setLoading(true);

        let requestPayload = {...payload};
        requestPayload.visa_type = payload.visa_type.code;
        requestPayload.service_type = payload.service_type.code;
        requestPayload.status = payload.status.code;

        const requestResult = await visaServiceServices.update(dispatch, params.id, requestPayload);

        if(requestResult.status === 200) {
            dispatch(updateError(null));
        }
        
        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        await visaServiceServices.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(visaService) {
            let updatePayload = { ...visaService };
            updatePayload.passport_image = null;
            updatePayload.visa_type = visaServicePayloads.visaTypes.filter(v => v.code === visaService.visa_type)[0];
            updatePayload.service_type = visaServicePayloads.serviceTypes.filter(v => v.code === visaService.service_type)[0];
            updatePayload.status = visaServicePayloads.statusTypes.filter(v => v.code === visaService.status)[0];
            updatePayload.visa_entry_date = visaService.visa_entry_date ? new Date(visaService.visa_entry_date) : "";
            updatePayload.visa_expiry_date = visaService.visa_expiry_date ? new Date(visaService.visa_expiry_date) : "";
            updatePayload.appointment_date = visaService.appointment_date ? new Date(visaService.appointment_date) : "";
            updatePayload.new_visa_expired_date = visaService.new_visa_expired_date ? new Date(visaService.new_visa_expired_date) : "";
            setPayload(updatePayload);
        }
    }, [visaService])

    return(
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

            <div className="grid grid-nogutter mt-3 p-3">
                <Card 
                    className="mt-3"
                    title="Update Visa Service"
                >
                    <div className="grid">
                        <div className="col-3 flex flex-row align-items-center justify-content-center">
                            <Image 
                                src={visaService ? `${endpoints.image}/${visaService.passport_image}` : defaultImage}
                                preview
                                width={300}
                                height={300}
                                style={{ objectFit: "cover", borderRadius: "4px" }}
                            />
                        </div>

                        <div className="col-9">
                            <div className="grid">

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Full Name"
                                    disabled={loading}
                                    value={payload.name}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Passport"
                                    disabled={loading}
                                    value={payload.passport}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "passport", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    type="file"
                                    placeholder="Upload Passport Photo"
                                    disabled={loading}
                                    value={passportImage}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "passport_image", (updatePayload) => {
                                        setPassportImage(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_image" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Dropdown
                                    className="w-full"
                                    placeholder="Choose Visa Service Type"
                                    options={visaServicePayloads.serviceTypes}
                                    value={payload.service_type}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "service_type", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="service_type" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Dropdown
                                    className="w-full"
                                    placeholder="Choose Visa Type"
                                    options={visaServicePayloads.visaTypes}
                                    value={payload.visa_type}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "visa_type", (updatePayload) => {

                                        if(e.value.code === "W.W14") {
                                            setAddDate(14);
                                        }

                                        if(e.value.code === "TR30") {
                                            setAddDate(60);
                                        }
                                        updatePayload.visa_entry_date = "";
                                        updatePayload.visa_expiry_date = "";
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="visa_type" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter Visa Entry Date"
                                    disabled={loading}
                                    value={payload.visa_entry_date}
                                    showIcon
                                    onChange={(e) => payloadHandler(payload, e.target.value, "visa_entry_date", (updatePayload) => {
                                        const newDate = new Date(e.target.value);
                                        newDate.setDate(e.target.value.getDate() + addDate);
                                        updatePayload.visa_expiry_date = newDate;
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="visa_entry_date" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter Visa Expired Date"
                                    disabled={true}
                                    value={payload.visa_expiry_date}
                                    showIcon
                                />
                            </div>
                            <ValidationMessage field="visa_expiry_date" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter Appointment Date"
                                    disabled={loading}
                                    value={payload.appointment_date}
                                    showIcon
                                    onChange={(e) => payloadHandler(payload, e.target.value, "appointment_date", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="appointment_date" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter New Visa Expired Date"
                                    disabled={loading}
                                    value={payload.new_visa_expired_date}
                                    showIcon
                                    onChange={(e) => payloadHandler(payload, e.target.value, "new_visa_expired_date", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="new_visa_expired_date" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Dropdown
                                    className="w-full"
                                    placeholder="Choose Status"
                                    options={visaServicePayloads.statusTypes}
                                    value={payload.status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="status" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="Update"
                                disabled={loading}
                                loading={loading}
                                onClick={() => updateVisaServiceHandler() }
                            />
                        </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}