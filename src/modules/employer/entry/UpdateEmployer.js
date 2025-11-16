import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { employerPayloads } from "../employerPayloads";
import { employerServices } from "../employerServices";
import { setEmployerCreateOrUpdateFrom } from "../employerSlice";
import { updateError } from "../../shareSlice";
import { useParams } from "react-router-dom";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";

export const UpdateEmployer = () => {

    const { employer, employerCreateOrUpdateFrom } = useSelector(state => state.employer);
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(employerCreateOrUpdateFrom);
    const [isConfirm, setIsConfirm] = useState(false);
    const [nationalCardPhoto, setNationalCardPhoto] = useState("");
    const [householdPhoto, setHouseholdPhoto] = useState("");
    
    const dispatch = useDispatch();
    const params = useParams();

    const updateEmployerHandler = async () => {
        setLoading(true);

        let updatePayload = { ...payload};

        updatePayload.employer_type = updatePayload.employer_type.code;
        updatePayload.national_card_photo = payload.national_card_photo === "" ? null : payload.national_card_photo;
        updatePayload.household_photo = payload.household_photo === "" ? null : payload.household_photo;
        
        const updateEmployerResponse = await employerServices.employerServiceUpdate(dispatch, updatePayload, params.id);

        if(updateEmployerResponse.status === 200) {
            await employerServices.employerServiceShow(dispatch, params.id);
            dispatch(updateError(null));
            setIsConfirm(false);
        }

        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        await employerServices.employerServiceShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch,params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(employer) {
            let updatePayload = {...employer};
            updatePayload.employer_type = employerPayloads.employerType.filter(value => value.code === employer.employer_type)[0];
            updatePayload.national_card_photo = "";
            updatePayload.household_photo = "";
            setPayload(updatePayload);
        }
    },[employer]);

    return(
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="grid grid-nogutter mt-3">
                <div className="w-full mt-3 p-3">
                    <BackButton isConfirm={isConfirm} />

                    <Card 
                        className="mt-3"
                        title="Update Employer Profile"
                    >

                        { employer && (
                            <div className="grid">
                                <div className="col-12 md:col-6 mt-3">
                                    <label> Employer Hosuehold Photo </label>
                                    <Image 
                                        className="customer-update-image mt-1"
                                        preview
                                        src={`${endpoints.image}/${employer.household_photo}`}
                                    />
                                </div>

                                <div className="col-12 md:col-6 mt-3">
                                    <label> Employer National ID Card Photo </label>
                                    <Image 
                                        className="customer-update-image mt-1"
                                        preview
                                        src={`${endpoints.image}/${employer.national_card_photo}`}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid">
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Employer Name </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        value={payload.full_name ? payload.full_name : ""}
                                        placeholder="Enter employer name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "full_name", (updatePayload) => {
                                            setPayload(updatePayload);
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="full_name" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> National ID Card Number (Required) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        value={payload.national_card_number ? payload.national_card_number : ""}
                                        placeholder="Enter national ID card number"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "national_card_number", (updatePayload) => {
                                            setPayload(updatePayload);
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="national_card_number" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Choose Employer Type (Required) </label>
                                    <Dropdown
                                        className="w-full mt-1"
                                        placeholder="Choose Employer Type"
                                        options={employerPayloads.employerType}
                                        value={payload.employer_type ? payload.employer_type : ""}
                                        optionLabel="name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.value, "employer_type", (updatePayload) => {
                                            setPayload(updatePayload);
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="employer_type" />
                            </div>


                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Upload Employer Household Photo (Optional) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        type="file"
                                        accept="image/*"
                                        value={householdPhoto ? householdPhoto : ""}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "household_photo", (updatePayload) => {
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                            setHouseholdPhoto(e.target.value);
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="household_photo" />
                            </div>
                            
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Upload Employer Household Photo (Optional) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        type="file"
                                        accept="image/*"
                                        value={nationalCardPhoto ? nationalCardPhoto : ""}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "national_card_photo", (updatePayload) => {
                                            setNationalCardPhoto(e.target.value);
                                            setPayload(updatePayload);
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="national_card_photo" />
                            </div>

                            <div className="col-12 md:col-9 mt-3">
                                <div className="w-full">
                                    <label> Remark(Optional) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        placeholder="Enter employer remark"
                                        value={payload.remark ? payload.remark : ""}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.value, "remark", (updatePayload) => {
                                            setPayload(updatePayload);
                                            dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="remark" />
                            </div>

                            {payload && payload.employer_type === "COMPANY" && (
                                <>
                                    <div className="col-13 md:col-12 mt-3">
                                        <label> Company Doucments Link </label>
                                        <InputText 
                                            className="w-full mt-1"
                                            placeholder="Enter Company Doucments Links"
                                            value={payload.remark ? payload.remark : ""}
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.value, "company_documents", (updatePayload) => {
                                                setPayload(updatePayload);
                                                dispatch(setEmployerCreateOrUpdateFrom(updatePayload))
                                            })}
                                        />
                                    </div>
                                <ValidationMessage field="company_documents" />
                                </>
                            )}

                            <div className="col-12 md:col-12 mt-3">
                                <Button 
                                    outlined
                                    severity="warning"
                                    size="small"
                                    label="SUBMIT"
                                    disabled={loading}
                                    loading={loading}
                                    icon="pi pi-save"
                                    onClick={() => {
                                        updateEmployerHandler()
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}