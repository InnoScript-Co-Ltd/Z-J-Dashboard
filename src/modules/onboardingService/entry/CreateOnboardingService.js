import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { onboardingServicePayloads } from "../onboardingServicePayloads";
import { useDispatch } from "react-redux";
import { customerServices } from "../../customer/customerService";
import { categoryServices } from "../../categories/categoryServices";
import { categoryServiceServices } from "../../categoryService/categoryServiceServices";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { employerServices } from "../../employer/employerServices";
import { employerPayloads } from "../../employer/employerPayloads";
import { onboardingServiceServices } from "../onboardingServiceServices";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/path";

export const CreateOnboardingService = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(onboardingServicePayloads.onboardingServiceCreateOrUpdate);
    const [isConfirm, setIsConfirm] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useRef([]);
    const serviceLists = useRef([]);
    const employers = useRef([]);
    const customer = useRef([]);

    const onCategoryChangeHandler = async (e) => {
        setLoading(true);
        const categoryServiceResponse = await categoryServiceServices.categoryServiceIndex(dispatch, {
            filter: "category_id,status",
            value: e.code + ",ACTIVE",
        });

        if(categoryServiceResponse.status === 200) {
            serviceLists.current = categoryServiceResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.name,
                    description: value.description,
                    fees: value.fees
                }
            })
        }
        setLoading(false);
    }

    const onChangeEmployerType = async (e) => {
        setLoading(true);
        const employerResponse = await employerServices.employerServiceIndex(dispatch, { filter: "employer_type", value: e });
        if(employerResponse.status === 200) {
            employers.current = employerResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.full_name
                }
            })
        }
        setLoading(false);
    }

    const addServiceHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.customer_id = payload.customer_id.code;
        updatePayload.category_id = payload.category_id.code;
        updatePayload.category_service_id = payload.category_service_id.code;
        updatePayload.employer_id = payload.employer_id.code;
        updatePayload.employer_type = payload.employer_type.code;
        updatePayload.status = payload.status.code;


        const onboardingServiceResponse = await onboardingServiceServices.onboardingServiceStore(dispatch, updatePayload);

        if(onboardingServiceResponse.status === 200) {
            setIsConfirm(false);
        }
        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);

        const customerResponse = await customerServices.customerIndex(dispatch, null);

        if(customerResponse.status === 200) {
            customer.current = customerResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.name
                }
            })
        }

        const categoryResponse = await categoryServices.categoryIndex(dispatch, { filter: "status", value: "ACTIVE"});

        if(categoryResponse.status === 200) {
            categories.current = categoryResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.label,
                    description: value.description
                }
            });
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

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
                    title="Add Service On Customer"
                >
                    <div className="grid">
                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Choose Customer (Required) </label>
                                        <Dropdown
                                            className="w-full mt-1"
                                            placeholder="Choose Customer"
                                            options={customer.current}
                                            value={payload.customer_id}
                                            optionLabel="name"
                                            disabled={loading}
                                            filter
                                            onChange={(e) => payloadHandler(payload, e.value, "customer_id", (updatePayload) => {
                                                updatePayload.customer_name = e.value.name;
                                                setPayload(updatePayload);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="customer_id" />
                                </div>

                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Choose Service Category (Required) </label>
                                        <Dropdown
                                            className="w-full mt-1"
                                            placeholder="Choose Service Category"
                                            options={categories.current}
                                            value={payload.category_id}
                                            optionLabel="name"
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.value, "category_id", (updatePayload) => {
                                                updatePayload.category = e.value.name;
                                                onCategoryChangeHandler(e.value)
                                                setPayload(updatePayload);
                                            })}
                                        />
                                        <small id="username-help" className="w-full"> {payload.category_id.description}</small>
                                    </div>
                                    <ValidationMessage field="category_id" />
                                </div>

                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Choose Service (Required) </label>
                                        <Dropdown 
                                            className="w-full mt-1"
                                            placeholder="Choose Service"
                                            options={serviceLists.current}
                                            value={payload.category_service_id}
                                            optionLabel="name"
                                            disabled={loading || serviceLists.current.length === 0 ? true : false}
                                            onChange={(e) => payloadHandler(payload, e.value, "category_service_id", (updatePayload) => {
                                                updatePayload.service = e.value.name;
                                                updatePayload.fees = e.value.fees;
                                                setPayload(updatePayload);
                                            })}
                                        />
                                        <small id="username-help" className="w-full"> {payload.category_service_id.description}</small>
                                    </div>
                                    
                                    <ValidationMessage field="category_service_id" />
                                </div>

                                <div className="col-3 md:col-3 mt-3">
                                    <div className="w-full">
                                        <label> Service Fees (Required) </label>
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
                                        severity="success"
                                        size="small"
                                        label="SUBMIT"
                                        disabled={loading}
                                        loading={loading}
                                        icon="pi pi-save"
                                        onClick={() => addServiceHandler()}
                                    />
                                </div>
                    </div>
                </Card>
            </div>
        </>
    )
}