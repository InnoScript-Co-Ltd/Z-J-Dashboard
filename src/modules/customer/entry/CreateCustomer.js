import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { updateError } from "../../shareSlice";
import { ConfirmDialog } from "primereact/confirmdialog";
import { setCreateCustomerForm } from "../customerSlice";

export const CreateCustomer = () => {

    const { customerCreateForm } = useSelector(state => state.customer);

    const [payload, setPayload] = useState(customerCreateForm);
    const [loading, setLoading] = useState(false);
    const [isConfirm, setIsConfirm] = useState(true);

    const [photo, setPhoto] = useState("");
    const [nrcFront, setNrcFront] = useState("");
    const [nrcBack, setNrcBack] = useState("");
    const [passportPhoto, setPassportPhoto] = useState("");
    const [socialAppQrOrPhoto, setSocialAppQrOrPhoto] = useState("");
    const [householdPhoto, setHouseholdPhoto] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createCustomerHandler = async () => {
        setLoading(true);

        let updatePayload = {...payload};

        const dob = new Date(payload.dob);

        updatePayload.status = payload.status.code;
        updatePayload.contact_by = payload.contact_by.code;
        
        updatePayload.dob = new Date(dob.setDate(dob.getDate() + 1)).toUTCString();

        const response = await customerServices.customerStore(dispatch, updatePayload);
        if(response.status === 200) {
            setIsConfirm(false);
            dispatch(updateError(null));
            navigate(-1);
        }
        setLoading(false);
    }

    return (
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="w-full mt-3 p-3">
                <BackButton isConfirm={isConfirm} />

                <Card 
                    className="mt-3"
                    title="Create Customer"
                >
                    <div className="grid">
                        <div className="col-12">
                            <h3> Personal Information </h3>
                        </div>

                        <div className="col-3 md:col-3">
                            <div className="w-full mt-3">
                                <label> Name (Required)</label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Customer Name"
                                    disabled={loading}
                                    value={payload.name}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC (Optional) </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter NRC"
                                    disabled={loading}
                                    value={payload.nrc}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
                        </div>


                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Passport (Optional) </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Passport"
                                    disabled={loading}
                                    value={payload.passport}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "passport", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Date of birth (Optional) </label>
                                <Calendar 
                                    className="w-full mt-1"
                                    placeholder="Enter Date of Birth"
                                    disabled={loading}
                                    value={payload.dob}
                                    showIcon
                                    onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload)
                                    })}
                                />
                            </div>
                            <ValidationMessage field="dob" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Phone (Optional) </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Phone"
                                    disabled={loading}
                                    value={payload.phone}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Email (Optional) </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Email"
                                    disabled={loading}
                                    value={payload.email}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Contact By (Optional) </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Enter Contact By"
                                    options={customerPayloads.customerContactByTypes}
                                    value={payload.contact_by}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "contact_by", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="contact_by" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Social App (Optional)</label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Social App (Text)"
                                    disabled={loading}
                                    value={payload.social_app}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "social_app", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="social_app" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Status (Required) </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Enter Contact By"
                                    options={customerPayloads.customerStatus}
                                    value={payload.status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="status" />
                        </div>


                        <div className="col-9 md:col-9 mt-3">
                            <div className="w-full">
                                <label> Remark (Optional) </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Remark"
                                    disabled={loading}
                                    value={payload.remark}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "remark", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="remark" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Customer Photo (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter Customer Profile Photo"
                                    disabled={loading}
                                    value={photo}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "photo", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Customer Household Photo (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter Customer Household Photo"
                                    disabled={loading}
                                    value={householdPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "household_photo", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setHouseholdPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="household_photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC Front (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter NRC Front Photo"
                                    disabled={loading}
                                    value={nrcFront}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "nrc_front", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setNrcFront(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_front" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC Back (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter NRC Back Photo"
                                    disabled={loading}
                                    value={nrcBack}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "nrc_back", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setNrcBack(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_back" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Passport Photo (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter Passport Photo"
                                    disabled={loading}
                                    value={passportPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "passport_photo", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setPassportPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Social App QR or Photo (Optional)</label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter  Social App QR or Photo"
                                    disabled={loading}
                                    value={socialAppQrOrPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "social_link_qrcode", (updatePayload) => {
                                        setCreateCustomerForm(updatePayload);
                                        setSocialAppQrOrPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="social_link_qrcode" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="CREATE"
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