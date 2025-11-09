import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import defaultImage from "../../../assets/images/default.webp";
import { setUpdateCustomerForm } from "../customerSlice";
import { ConfirmDialog } from "primereact/confirmdialog";

export const UpdateCustomer = () => {

    const { customer, customerUpdateForm } = useSelector(state => state.customer);

    const [loading, setLoading] = useState(false);
    const [isConfirm, setIsConfirm] = useState(true);
    const [payload, setPayload] = useState(customerUpdateForm);
    const [householdPhoto, setHouseholdPhoto] = useState("");
    const [photo, setPhoto] = useState("");
    const [nrcFront, setNrcFront] = useState("");
    const [nrcBack, setNrcBack] = useState("");
    const [passportPhoto, setPassportPhoto] = useState("");
    const [socialAppQrOrPhoto, setSocialAppQrOrPhoto] = useState("");

    const dispatch = useDispatch();
    const params = useParams();

    const updateCustomerHandler = async () => {
        setIsConfirm(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        await customerServices.customerShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    const mount = useCallback(async () => {
        if(customer) {
            let updatePayload = {...customer};
            updatePayload.status = customerPayloads.customerStatus.filter(value => value.code === customer.status)[0];
            updatePayload.contact_by = customerPayloads.customerContactByTypes.filter(value => value.code === customer.contact_by)[0];
            setPayload(updatePayload);
        }
    }, [customer]); 

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        mount();
    }, [mount])

    return (
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="w-full mt-3 p-3">
                <BackButton isConfirm={isConfirm} />

                <Card 
                    className="mt-3"
                    title="Update Customer"
                >
                    <div className="grid">
                        <div className="col-3 mt-3">
                            <label> Customer Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.photo ? `${endpoints.image}/${customer.photo}` : defaultImage}
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> Customer Household Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.household_photo ? `${endpoints.image}/${customer.household_photo}` : defaultImage}
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> NRC Front Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.nrc_front ? `${endpoints.image}/${customer.nrc_front}` : defaultImage}
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> NRC Back Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.nrc_back ? `${endpoints.image}/${customer.nrc_back}` : defaultImage }
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> Passport Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.passport_photo ? `${endpoints.image}/${customer.passport_photo}` : defaultImage }
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> Social Link Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.social_link_qrcode ? `${endpoints.image}/${customer.social_link_qrcode}` : defaultImage }
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3"></div>
                        <div className="col-3 mt-3"></div>

                        <div className="col-3 md:col-3">
                            <div className="w-full mt-3">
                                <label> Name</label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Customer Name"
                                    disabled={loading}
                                    value={payload.name}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter NRC"
                                    disabled={loading}
                                    value={payload.nrc}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Passport </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Passport"
                                    disabled={loading}
                                    value={payload.passport}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "passport", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Date of birth</label>
                                <Calendar 
                                    className="w-full mt-1"
                                    placeholder="Enter Date of Birth"
                                    disabled={loading}
                                    value={payload.dob}
                                    showIcon
                                    onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload)
                                    })}
                                />
                            </div>
                            <ValidationMessage field="dob" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Phone </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Phone"
                                    disabled={loading}
                                    value={payload.phone}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Email </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Email"
                                    disabled={loading}
                                    value={payload.email}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Contact By</label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Enter Contact By"
                                    options={customerPayloads.customerContactByTypes}
                                    value={payload.contact_by}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "contact_by", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="contact_by" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Social App (Text)</label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Social App (Text)"
                                    disabled={loading}
                                    value={payload.social_app}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "social_app", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="social_app" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Status </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Enter Contact By"
                                    options={customerPayloads.customerStatus}
                                    value={payload.status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="status" />
                        </div>

                        <div className="col-12 md:col-9 mt-3">
                            <div className="w-full">
                                <label> Remark </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Remark"
                                    disabled={loading}
                                    value={payload.remark}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "remark", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="remark" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Customer Photo </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter Customer Profile Photo"
                                    disabled={loading}
                                    value={photo}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "photo", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC Front </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter NRC Front Photo"
                                    disabled={loading}
                                    value={nrcFront}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "nrc_front", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setNrcFront(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_front" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> NRC Back </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter NRC Back Photo"
                                    disabled={loading}
                                    value={nrcBack}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "nrc_back", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setNrcBack(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_back" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Passport Photo </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter Passport Photo"
                                    disabled={loading}
                                    value={passportPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "passport_photo", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setPassportPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Customer Household Photo </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Upload Customer Household Photo"
                                    disabled={loading}
                                    value={householdPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "household_photo", (updatePayload) => {
                                        dispatch(setUpdateCustomerForm(updatePayload))
                                        setHouseholdPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="household_photo" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Social App QR or Photo </label>
                                <InputText 
                                    type="file"
                                    className="w-full mt-1"
                                    placeholder="Enter  Social App QR or Photo"
                                    disabled={loading}
                                    value={socialAppQrOrPhoto}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], "social_link_qrcode", (updatePayload) => {
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
                                label="UPDATE"
                                disabled={loading}
                                loading={loading}
                                onClick={() => updateCustomerHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}