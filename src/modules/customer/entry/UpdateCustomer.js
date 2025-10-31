import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { customerPayloads } from "../customerPayloads";
import { customerServices } from "../customerService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { settingServices } from "../../setting/settingServices";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import defaultImage from "../../../assets/images/default.webp";
import { updateError } from "../../shareSlice";

export const UpdateCustomer = () => {

    const { customer } = useSelector(state => state.customer);
    const { services } = useSelector(state => state.setting);

    const [payload, setPayload] = useState(customerPayloads.createOrUpdate);
    const [loading, setLoading] = useState(false);

    const [photo, setPhoto] = useState("");
    const [nrcFront, setNrcFront] = useState("");
    const [nrcBack, setNrcBack] = useState("");
    const [passportPhoto, setPassportPhoto] = useState("");
    const [socialAppQrOrPhoto, setSocialAppQrOrPhoto] = useState("");
    const [employerPhoto, setEmployerPhoto] = useState("");
    const [employerHouseHoldPhoto, setEmployerHouseholdPhoto] = useState("");

    const dispatch = useDispatch();
    const params = useParams();

    const serviceList = useRef([]);

    const updateCustomerHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.employer = payload.employer.code;
        updatePayload.contact_by = payload.contact_by.code;
        updatePayload.status = payload.status.code;
        updatePayload.employer_type = payload.employer_type.code;
        updatePayload.year_of_insurance = payload.year_of_insurance.code;

        updatePayload.photo = updatePayload.photo === "" ? null : updatePayload.photo;
        updatePayload.nrc_front = updatePayload.nrc_front === "" ? null : updatePayload.nrc_front;
        updatePayload.nrc_back = updatePayload.nrc_back === "" ? null : updatePayload.nrc_back;
        updatePayload.passport_photo = updatePayload.passport_photo === "" ? null : updatePayload.passport_photo;
        updatePayload.employer_photo = updatePayload.employer_photo === "" ? null : updatePayload.employer_photo;
        updatePayload.employer_household_photo = updatePayload.employer_household_photo === "" ? null : updatePayload.employer_household_photo;
        updatePayload.social_link_qrcode = updatePayload.social_link_qrcode === "" ? null : updatePayload.social_link_qrcode;

        const response = await customerServices.update(dispatch, params.id, updatePayload);

        if(response.status === 200) {
            dispatch(updateError(null))
        }
        setLoading(false);
    }

    const init = useCallback(async() => {
        setLoading(true);
        await settingServices.serviceIndex(dispatch, {filter: "status", value: "ACTIVE"});
        await customerServices.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(customer && services) {
            let updatePayload = {...customer};

            serviceList.current = services.map((value) => {
                return {
                    code: value.service_type,
                    name: value.service_type,
                    fees: value.fees
                }
            });

            updatePayload.year_of_insurance = customer.year_of_insurance ? serviceList.current.filter(value => value.code === customer.year_of_insurance)[0] : "";
            updatePayload.status = customer.status ? customerPayloads.status.filter(value => value.code === customer.status)[0] : "";
            updatePayload.employer = customer.employer ? customerPayloads.employer.filter(value => value.code === customer.employer)[0] : "";
            updatePayload.employer_type = customer.employer_type ? customerPayloads.employerTypes.filter(value => value.code === customer.employer_type)[0] : "";
            updatePayload.contact_by = customer.contact_by ? customerPayloads.contactByTypes.filter(value => value.code === customer.contact_by)[0] : "";
            updatePayload.dob = new Date(customer.dob);

            updatePayload.photo = "";
            updatePayload.nrc_front = "";
            updatePayload.nrc_back = "";
            updatePayload.passport_photo = "";
            updatePayload.employer_photo = "";
            updatePayload.socail_link_qrcode = "";
            updatePayload.employer_household_photo = "";
            updatePayload.social_link_qrcode = "";

            setPayload(updatePayload);
        }
    }, [customer, services]);

    return (
        <>
            <HeaderBar /> 

            <div className="w-full mt-3 p-3">
                <BackButton />

                <Card 
                    className="mt-3"
                    title="Update Customer"
                >
                    <div className="grid">
                        <div className="col-12">
                            <h3> Personal Information </h3>
                        </div>

                        <div className="col-3 mt-3">
                            <label> Customer Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.photo ? `${endpoints.image}/${customer.photo}` : defaultImage}
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

                        <div className="col-3 mt-3">
                            <label> Employer Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.employer_photo ? `${endpoints.image}/${customer.employer_photo}` : defaultImage }
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3">
                            <label> Employer Household Photo </label>
                            <Image 
                                className="customer-update-image mt-1"
                                src={customer && customer.employer_household_photo ? `${endpoints.image}/${customer.employer_household_photo}` : defaultImage }
                                preview
                            />
                        </div>

                        <div className="col-3 mt-3"></div>

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
                            { services && services.length > 0 && (
                                <div className="w-full">
                                    <label> Choose Year Of Insurance </label>
                                    <Dropdown
                                        className="w-full mt-1"
                                        placeholder="Choose Year Of Insurance"
                                        options={serviceList.current}
                                        value={payload.year_of_insurance}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value, "year_of_insurance", (updatePayload) => {
                                            updatePayload.fees = e.value.fees;
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                            )}
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
                                label="Update"
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