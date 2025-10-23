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
import { customerPayloads } from "../customerPayload"
import { Calendar } from "primereact/calendar"
import { customerServices } from "../customerServices"

export const CreateCustomer = () => {

    const [payload, setPayload] = useState(customerPayloads.createOrUpdate);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const marketingStatusList = [
        { name: 'CONFIRMED', code: 'CONFIRMED' },
        { name: 'STILL', code: 'STILL' },
        { name: 'CANCEL', code: 'CANCEL' },
    ];

    const createCustomerHandler = async () => {
        setLoading(true);

        let requestPayload = {...payload};
        requestPayload.marketing_status = payload.marketing_status.code;

        const requestResult = await customerServices.store(dispatch, requestPayload);

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
                    title="Create Customer"
                    subTitle="Track sales & commissions in real time"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Full Name"
                                    disabled={loading}
                                    value={payload.fullname}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "fullname", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="fullname" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter Registered Date"
                                    disabled={loading}
                                    value={payload.registered_at}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "registered_at", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="registered_at" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter NRC Number"
                                    disabled={loading}
                                    value={payload.nrc}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    type="file"
                                    className="w-full"
                                    placeholder="Upload Customer Photo"
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "photo", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="photo" />
                        </div>

                         <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText
                                    className="w-full"
                                    placeholder="Enter Passport CI "
                                    disabled={loading}
                                    value={payload.passport_ci}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "passport_ci", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_ci" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Calendar 
                                    className="w-full"
                                    placeholder="Enter Date Of Birth"
                                    disabled={loading}
                                    value={payload.dob}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="dob" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Phone Number"
                                    disabled={loading}
                                    value={payload.phone}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Contact By"
                                    disabled={loading}
                                    value={payload.contact_by}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "contact_by", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="contact_by" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Social App"
                                    disabled={loading}
                                    value={payload.social_app}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "social_app", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="social_app" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Dropdown
                                    className="w-full"
                                    placeholder="Select marketing status"
                                    options={marketingStatusList}
                                    value={payload.marketing_status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "marketing_status", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="marketing_status" />
                        </div>

                        <div className="col-6 md:col-6 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter remark"
                                    disabled={loading}
                                    value={payload.remark}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "remark", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="remark" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => createCustomerHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}