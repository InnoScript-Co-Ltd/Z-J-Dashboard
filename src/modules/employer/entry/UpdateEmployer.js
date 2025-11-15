import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { employerPayloads } from "../employerPayloads";
import { Toast } from "primereact/toast";
import { employerServices } from "../employerServices";
import { setEmployerCreateOrUpdateFrom } from "../employerSlice";
import { updateError } from "../../shareSlice";
import { useParams } from "react-router-dom";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import { getRequest } from "../../../utilities/api";
import { paths } from "../../../constants/path";

export const UpdateEmployer = () => {

    const { employer, employerCreateOrUpdateFrom } = useSelector(state => state.employer);
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(employerCreateOrUpdateFrom);
    const [totalSize, setTotalSize] = useState(0);
    const [isConfirm, setIsConfirm] = useState(false);
    const [nationalCardPhoto, setNationalCardPhoto] = useState("");
    const [householdPhoto, setHouseholdPhoto] = useState("");
    const [companyDocuments, setCompanyDocuments] = useState([]);

    const dispatch = useDispatch();
    const params = useParams();

    const fileUploadRef = useRef(null);
    const toast = useRef(null);

    const updateEmployerHandler = async () => {
        setLoading(true);

        let updatePayload = { ...payload};

        updatePayload.employer_type = updatePayload.employer_type.code;
        updatePayload.national_card_photo = payload.national_card_photo === "" ? null : payload.national_card_photo;
        updatePayload.household_photo = payload.household_photo === "" ? null : payload.household_photo;
        
        if(updatePayload.employer_type === "COMPANY") {
            updatePayload.update_documents = companyDocuments && companyDocuments.length > 0 ? companyDocuments.toString() : null;
        }
        
        console.log(updatePayload);
        
        const updateEmployerResponse = await employerServices.employerServiceUpdate(dispatch, updatePayload, params.id);

        if(updateEmployerResponse.status === 200) {
            // await employerServices.employerServiceShow(dispatch, params.id);
            dispatch(updateError(null));
            setIsConfirm(false);
        }

        setLoading(false);
    }

    const downlaodFileHandler = async (fileName) => {
        setLoading(true);
        const response = await getRequest(`${paths.DOWNLOAD}/${fileName}`, null, dispatch);
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
            updatePayload.company_documents = [];

            setCompanyDocuments(employer.company_documents);
            setPayload(updatePayload);
        }
    },[employer]);

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

                            {employer && employer.employer_type === "COMPANY" && (
                                <div className="flex flex-row align-items-center justify-content-start m-3" style={{width: "10rem"}}>
                                    { (companyDocuments && companyDocuments.length > 0) && companyDocuments.map((value, index) => {
                                        const extension = value.split(".");
                                        return (
                                            <div
                                                className="mr-3 w-full"
                                                key={`${employer.code}_company_documents_id_${index}`}
                                            >
                                                <div className="w-full flex flex-column justify-content-center align-items-center">
                                                { extension[1] === "pdf" && (
                                                    <i className="pi pi-file-pdf" style={{fontSize: "5rem"}}></i>
                                                )}


                                                { (extension[1] === "png" || extension[1] === 'jpeg' || extension[1] === 'gif' || extension[1] === 'jpg') && (
                                                    <i className="pi pi-image" style={{fontSize: "5rem"}}></i>
                                                )}

                                                { (extension[1] === 'xls' || extension[1] === 'xlsx') && (
                                                    <i className="pi pi-file-excel" style={{fontSize: "5rem"}}></i>
                                                )}
                                                
                                                { (extension[1] === 'doc' || extension[1] === 'docx') && (
                                                    <i className="pi pi-file-word" style={{fontSize: "5rem"}}></i>
                                                )}
                                                
                                                <div className="w-full overflow-auto mt-3">
                                                    <span className="white-space-nowrap mt-3" style={{fontSize: "small"}}> {value} </span>
                                                </div>

                                                <Button
                                                    className="mt-3 w-full"
                                                    outlined
                                                    size="small"
                                                    label="DOWNLOAD"
                                                    icon="pi pi-download"
                                                    onClick={() => downlaodFileHandler(value)}
                                                />

                                                <Button
                                                    className="mt-2 w-full"
                                                    outlined
                                                    size="small"
                                                    severity="danger"
                                                    label="REMOVE"
                                                    icon="pi pi-trash"
                                                    onClick={() => {
                                                        let updateDocuments = companyDocuments.filter(file => file !== value);
                                                        setCompanyDocuments(updateDocuments);
                                                    }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

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
                                    label="UPDATE"
                                    disabled={loading}
                                    loading={loading}
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