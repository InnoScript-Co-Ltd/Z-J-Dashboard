import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { employerPayloads } from "../employerPayloads";
import { employerServices } from "../employerServices";
import { updateError } from "../../shareSlice";
import { paths } from "../../../constants/path";

export const CreateEmployer = () => {

    const { employerCreateOrUpdateFrom } = useSelector(state => state.employer);
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(employerCreateOrUpdateFrom);
    const [isConfirm, setIsConfirm] = useState(false);
    const [nationalCardPhoto, setNationalCardPhoto] = useState("");
    const [householdPhoto, setHouseholdPhoto] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createEmployerHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.employer_type = payload.employer_type.code;

        const createEmployerResponse = await employerServices.employerServiceStore(dispatch, updatePayload);

        if(createEmployerResponse.status === 200) {
            dispatch(updateError(null));
            setIsConfirm(false);
            navigate(paths.EMPLOYER);
        }

        setLoading(false);
    }

    return(
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="grid">
                <div className="w-full mt-3 p-3">
                    <BackButton isConfirm={isConfirm} />

                    <Card 
                        className="mt-3"
                        title="Create Employer Profile"
                    >
                        <div className="grid">
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Employer Name (Required) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        value={payload.full_name}
                                        placeholder="Enter employer name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "full_name", (updatePayload) => {
                                            setPayload(updatePayload)
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
                                        value={payload.national_card_number}
                                        placeholder="Enter national ID card number"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "national_card_number", (updatePayload) => {
                                            setPayload(updatePayload)
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
                                        value={payload.employer_type}
                                        optionLabel="name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.value, "employer_type", (updatePayload) => {
                                            setPayload(updatePayload);
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
                                        value={householdPhoto}
                                        disabled={loading}
                                        accept="image/*"
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "household_photo", (updatePayload) => {
                                            setHouseholdPhoto(e.target.value)
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
                                        value={nationalCardPhoto}
                                        disabled={loading}
                                        accept="image/*"
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "national_card_photo", (updatePayload) => {
                                            setNationalCardPhoto(e.target.value)
                                            setPayload(updatePayload);
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
                                        value={payload.remark}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.value, "remark", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="remark" />
                            </div>

                            {payload.employer_type.code === "COMPANY" && (
                            <div className="col-12 md:col-12 mt-3">
                                <div className="w-full">
                                    <label> Company Documents (Drive Link) </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        placeholder="Enter company documents drive link"
                                        value={payload.remark}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.value, "company_documents", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="remark" />
                            </div>
                            )}

                            <div className="col-12 md:col-12 mt-3">
                                <Button 
                                    outlined
                                    severity="warning"
                                    size="small"
                                    label="SUBMIT"
                                    icon="pi pi-save"
                                    disabled={loading}
                                    loading={loading}
                                    onClick={() => {
                                        createEmployerHandler()
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