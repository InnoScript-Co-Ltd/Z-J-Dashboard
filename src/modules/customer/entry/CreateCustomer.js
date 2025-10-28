import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";

export const CreateCustomer = () => {

    const [payload, setPayload] = useState(customerPayloads.createOrUpdate);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState("");
    const [nrcFront, setNrcFront] = useState("");
    const [nrcBack, setNrcBack] = useState("");
    const [passportPhoto, setPassportPhoto] = useState("");
    const [socialAppQrOrPhoto, setSocialAppQrOrPhoto] = useState("");
    const [employerPhoto, setEmployerPhoto] = useState("");
    const [employerHouseHoldPhoto, setEmployerHouseholdPhoto] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createCustomerHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.employer = payload.employer.code;
        updatePayload.contact_by = payload.contact_by.code;
        updatePayload.status = payload.status.code;
        updatePayload.employer_type = payload.employer_type.code;
        updatePayload.fees = 3000;

        const response = await customerServices.store(dispatch, updatePayload);
        if(response.status === 200) {
            navigate(-1);
        }
        setLoading(false);
    }

    return (
        <>
            <HeaderBar /> 

            <div className="w-full mt-3 p-3">
                <BackButton />

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
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
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
                                        setPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="photo" />
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
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
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
                                        setNrcBack(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_back" />
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
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport" />
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
                                        setPassportPhoto(e.target.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_photo" />
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
                                    options={customerPayloads.contactByTypes}
                                    value={payload.contact_by}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "contact_by", (updatePayload) => {
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
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="social_app" />
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

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Status (Required) </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Enter Contact By"
                                    options={customerPayloads.status}
                                    value={payload.status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="status" />
                        </div>

                        <div className="col-6 md:col-6 mt-3">
                            <div className="w-full">
                                <label> Remark </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Remark"
                                    disabled={loading}
                                    value={payload.remark}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "remark", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="remark" />
                        </div>

                        <div className="col-12">
                            <Divider />
                            <h3> Employer Information </h3>
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Choose Employer</label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Employer"
                                    options={customerPayloads.employer}
                                    value={payload.employer}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "employer", (updatePayload) => {
                                        if(e.value.code === "EMPLOYER") {
                                            updatePayload.pink_card = "PINK_CARD_HOLDER";
                                        }

                                        if(e.value.code === "HIRE_EMPLOYER") {
                                            updatePayload.pink_card = "NO_PINK_CARD";
                                        }
                                        
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="employer" />
                        </div>

                        { payload.employer.code === 'EMPLOYER' && (
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Choose Employer Type</label>
                                    <Dropdown
                                        className="w-full mt-1"
                                        placeholder="Choose Employer Type"
                                        options={customerPayloads.employerTypes}
                                        value={payload.employer_type}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value, "employer_type", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="employer_type" />
                            </div>
                        )}

                        { payload.employer.code === 'EMPLOYER' && (
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Employer Photo </label>
                                    <InputText 
                                        type="file"
                                        className="w-full mt-1"
                                        placeholder="Enter Employer Photo"
                                        disabled={loading}
                                        value={employerPhoto}
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "employer_photo", (updatePayload) => {
                                            setEmployerPhoto(e.target.value);
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="employer_photo" />
                            </div>
                        )}

                        { payload.employer.code === 'EMPLOYER' && (
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Employer Household List Photo </label>
                                    <InputText 
                                        type="file"
                                        className="w-full mt-1"
                                        placeholder="Enter Employer Household Photo"
                                        disabled={loading}
                                        value={employerHouseHoldPhoto}
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "employer_household_photo", (updatePayload) => {
                                            setEmployerHouseholdPhoto(e.target.value);
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="employer_household_photo" />
                            </div>
                        )}

                        { payload.employer.code === 'EMPLOYER' && payload.employer_type.code === 'COMPANY' && (
                            <div className="col-12 md:col-12 mt-3">
                                <div className="w-full">
                                    <label> Employer Company Data Link (Drive Link) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        placeholder="Enter Employer Company Data Link"
                                        disabled={loading}
                                        value={payload.employer_company_data}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "employer_company_data", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="employer_company_data" />
                            </div>
                        )}

                        <div className="col-12">
                            <Divider />
                            <h3> Service Fee </h3>
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Choose Year Of Insurance </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Year Of Insurance"
                                    options={customerPayloads.yearOfInsurances}
                                    value={payload.year_of_insurance}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "year_of_insurance", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="year_of_insurance" />
                        </div>

                        <div className="col-12 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Service Fee </label>
                                <InputText 
                                    className="w-full mt-1"
                                    disabled={true}
                                    value={payload.fees}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "fees", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="fees" />
                        </div>

                        <div className="col-12 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Balance </label>
                                <InputText 
                                    className="w-full mt-1"
                                    disabled={true}
                                    value={payload.balance}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "balance", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="balance" />
                        </div>

                        <div className="col-12 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Deposit </label>
                                <InputText 
                                    className="w-full mt-1"
                                    disabled={loading}
                                    placeholder="Enter Deposit Fee"
                                    value={payload.deposit_amount}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "deposit_amount", (updatePayload) => {
                                        updatePayload.balance = payload.fees - e.target.value;
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="deposit_amount" />
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