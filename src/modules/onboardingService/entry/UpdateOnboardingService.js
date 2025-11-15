import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryServices as _categoryServices } from "../../categories/categoryServices";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { employerServices } from "../../employer/employerServices";
import { onboardingServiceServices } from "../onboardingServiceServices";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/path";
import { categoryServiceServices } from "../../categoryService/categoryServiceServices";
import { InputText } from "primereact/inputtext";

export const UpdateOnboardingService = () => {

    const { onboarding } = useSelector(state => state);
    const { onboardingService, setOnboardingServiceCreateOrUpdateFrom, onboardingServiceCreateOrUpdateForm } = onboarding;
    const [payload, setPayload] = useState(onboardingServiceCreateOrUpdateForm);
    const [loading, setLoading] = useState(false);
    const [isConfirm, setIsConfirm] = useState(true);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const onLoadingCategoryService = useCallback(async (id) => {
        setLoading(true);
        const categoryServiceResponse = await categoryServiceServices.categoryServiceIndex(dispatch, {filter: "status,category_id", value: `ACTIVE,${id}`});

        if(categoryServiceResponse.status === 200) {
            setServices(
                categoryServiceResponse.data.map((value) => {
                    return {
                        code: value.id,
                        name: value.name,
                        description: value.description
                    }
                })
            )
        }

        setLoading(false);
    }, [dispatch]);

    const init = useCallback(async () => {
        setLoading(true);
        await onboardingServiceServices.onboardingServiceShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);


    const mount = useCallback(async () => {
        if(!onboardingService) return;

        let updatePayload = {...onboardingService};
        let categoriesResult = [];
        let serviceResult = [];

        const categoryResponse = await _categoryServices.categoryIndex(dispatch, {filter: "status", value: "ACTIVE"});

        if(categoryResponse.status === 200) {
            categoriesResult = categoryResponse.data.map(value => ({
                code: value.id,
                name: value.label,
                description: value.description
            }))
        }

        setCategories(categoriesResult);

        updatePayload.category_id = categoriesResult.find(value => value.code === onboardingService.category_id);

        const categoryServiceResponse = await categoryServiceServices.categoryServiceIndex(dispatch, {filter: "status,category_id", value: `ACTIVE,${updatePayload.category_id.code}`});

        if(categoryServiceResponse.status === 200) {
            serviceResult = categoryServiceResponse.data.map(value => ({
                code: value.id,
                name: value.name,
                description: value.description
            }));
        }

        setServices(serviceResult);

        updatePayload.category_service_id = serviceResult.find(value => value.code === onboardingService.category_service_id);

        setPayload(updatePayload);
    }, [onboardingService]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        mount();
    }, [mount]);

    return(
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="w-full p-3">
                <div className="flex flex-row justify-content-between align-items-center mt-3">
                    <BackButton isConfirm={isConfirm} />

                    <div className="">
                        <Button 
                            outlined
                            className="mr-3"
                            size="small"
                            severity="success"
                            label="CUSTOMER"
                            icon="pi pi-plus"
                            onClick={() => navigate(`${paths.CUSTOMER_LIST}/create`)}
                        />

                        <Button 
                            outlined
                            className="mr-3"
                            size="small"
                            severity="success"
                            label="EMPLOYER"
                            icon="pi pi-plus"
                            onClick={() => navigate(`${paths.EMPLOYER}/create`)}
                        />

                        <Button 
                            outlined
                            size="small"
                            severity="success"
                            label="CATEGORY (OR) SERVICE"
                            icon="pi pi-plus"
                            onClick={() => navigate(`${paths.SETTING}`)}
                        />
                    </div>
                </div>

                <Card 
                    className="mt-3"
                    title="Edit Customer Service"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <label> Choose Category </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Category"
                                    options={categories.length > 0 ? categories : []}
                                    value={payload.category_id}
                                    optionLabel="name"
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.value, "category_id", (updatePayload) => {
                                        updatePayload.category = e.value.name;
                                        //onLoadServices(e.value.code);
                                        setPayload(updatePayload);
                                    })}
                                />
                                <small id="username-help" className="w-full"> { payload.category_id.description}</small>
                            </div>
                            <ValidationMessage field="category_id" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Choose Service </label>
                                        <Dropdown 
                                            className="w-full mt-1"
                                            placeholder="Choose Service"
                                            options={services.length > 0 ? services : []}
                                            value={payload.category_service_id}
                                            optionLabel="name"
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.value, "category_service_id", (updatePayload) => {
                                                updatePayload.service = e.value.name;
                                                updatePayload.fees = e.value.fees;
                                                setPayload(updatePayload);
                                            })}
                                        />
                                        <small id="username-help" className="w-full"> {payload?.category_service_id?.description}</small>
                                    </div>
                                    
                                    <ValidationMessage field="category_service_id" />
                        </div>    

                        <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Service Fees </label>
                                        <InputText 
                                            className="w-full mt-1"
                                            value={payload.fees}
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.value, "fees", (updatePayload) => {
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="fees" />
                        </div>   

                        <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Deposit Amount (Optional) </label>
                                        <InputText 
                                            className="w-full mt-1"
                                            value={payload.deposit}
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.target.value, "deposit", (updatePayload) => {
                                                updatePayload.balance = payload.fees - e.target.value;
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="deposit" />
                                </div>                       

{/* 
                                

                                

                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Remaining Balance (Auto) </label>
                                        <InputText 
                                            className="w-full mt-1"
                                            value={payload.balance}
                                            disabled={true}
                                        />
                                    </div>
                                    <ValidationMessage field="balance" />
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
                                            disabled={loading || serviceLists.current.length === 0 ? true : false}
                                            onChange={(e) => payloadHandler(payload, e.value, "employer_type", (updatePayload) => {
                                                onChangeEmployerType(e.value.code);
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="employer_type" />
                                </div>

                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Choose Employer (Required) </label>
                                        <Dropdown 
                                            className="w-full mt-1"
                                            placeholder="Choose Employer"
                                            options={employers.current}
                                            value={payload.employer_id}
                                            optionLabel="name"
                                            filter
                                            disabled={loading || employers.current.length === 0 ? true : false}
                                            onChange={(e) => payloadHandler(payload, e.value, "employer_id", (updatePayload) => {
                                                console.log(e.value);
                                                updatePayload.employer_name = e.value.name;
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="employer_id" />
                                </div>

                                <div className="col-12 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Status (Required) </label>
                                        <Dropdown
                                            className="w-full mt-1"
                                            placeholder="Choose Status"
                                            options={onboardingServicePayloads.status}
                                            value={payload.status}
                                            optionLabel="name"
                                            onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="status" />
                                </div>

                                <div className="col-12 md:col-9 mt-3">
                                    <div className="w-full">
                                        <label> Remark (Optional) </label>
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

                                <div className="col-12 md:col-12 mt-3">
                                    <Button 
                                        outlined
                                        severity="warning"
                                        size="small"
                                        label="SUBMIT"
                                        disabled={loading}
                                        loading={loading}
                                        icon="pi pi-save"
                                        onClick={() => addServiceHandler()}
                                    />
                                </div> */}
                    </div>
                </Card>
            </div>
        </>
    )
}