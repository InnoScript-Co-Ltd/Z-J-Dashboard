import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { customerServices } from "../../customer/customerService";
import { categoryServices } from "../../categories/categoryServices";
import { categoryServiceServices } from "../../categoryService/categoryServiceServices";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { employerPayloads } from "../employerPayloads";
import { Toast } from "primereact/toast";

export const CreateEmployer = () => {

    const { employerCreateOrUpdateFrom, setEmployerCreateOrUpdateForm } = useSelector(state => state.employer);
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(employerCreateOrUpdateFrom);
    const [totalSize, setTotalSize] = useState(0);
    const [isConfirm, setIsConfirm] = useState(false);
    const [nationalCardPhoto, setNationalCardPhoto] = useState("");
    const [householdPhoto, setHouseholdPhoto] = useState("");


    const dispatch = useDispatch();

    const fileUploadRef = useRef(null);
    const toast = useRef(null);

    const createEmployerHandler = async () => {
        setLoading(true);
        console.log(payload);
        setLoading(false);
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };


    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    };


    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center mr-3">
                    <i className="pi pi-file"></i>
                    <span className="flex flex-column text-left ml-3"> {file.name} </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-file', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

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
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "household_photo", (updatePayload) => {
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
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], "national_card_photo", (updatePayload) => {
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
                                    <Toast ref={toast}></Toast>

                                    <FileUpload 
                                        ref={fileUploadRef}
                                        multiple 
                                        accept="/*"
                                        onSelect={(e) => payloadHandler(payload, e.files, "company_documents", (updatePayload) => {
                                            setPayload(updatePayload)
                                        })}
                                        onError={onTemplateClear} 
                                        onClear={onTemplateClear}
                                        headerTemplate={headerTemplate} 
                                        itemTemplate={itemTemplate} 
                                        emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions} 
                                        cancelOptions={cancelOptions}
                                    />
                                </div>
                            )}

                            <div className="col-12 md:col-12 mt-3">
                                <Button 
                                    size="small"
                                    label="CREATE"
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