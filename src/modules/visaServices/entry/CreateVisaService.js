import { Card } from "primereact/card"
import { HeaderBar } from "../../../components/HeaderBar"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { payloadHandler } from "../../../utilities/handlers"
import { useDispatch } from "react-redux"
import { ValidationMessage } from "../../../components/ValidationMessage"
import { Dropdown } from "primereact/dropdown"
import { updateError } from "../../shareSlice"
import { BackButton } from "../../../components/BackButton";
import { visaServicePayloads } from "../visaServicePayload"
import { Calendar } from "primereact/calendar"
import { visaServiceServices } from "../visaServiceServices"
import moment from "moment";

export const CreateVisaService = () => {

    const [payload, setPayload] = useState(visaServicePayloads.createOrUpdate);
    const [passportImage, setPassportImage] = useState("");
    const [addDate, setAddDate] = useState(60);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createVisaServiceHandler = async () => {
        setLoading(true);

        let requestPayload = {...payload};
        requestPayload.visa_type = payload.visa_type.code;
        requestPayload.service_type = payload.service_type.code;
        requestPayload.status = payload.status.code;

        const requestResult = await visaServiceServices.store(dispatch, requestPayload);

        if(requestResult.status === 200) {
            dispatch(updateError(null));
            navigate(-1);
        }
        
        setLoading(false);
    }

    return(
        <>
            <HeaderBar />
            
            <div className="w-full mt-3 p-3">
                <BackButton />

                <Card 
                    className="mt-3"
                    title="Create Visa Service"
                >
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
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => createVisaServiceHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}