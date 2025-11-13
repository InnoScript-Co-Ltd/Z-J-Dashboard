import { ConfirmDialog } from "primereact/confirmdialog";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { onboardingServicePayloads } from "../onboardingServicePayloads";
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

export const CreateOnboardingService = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(onboardingServicePayloads.onboardingServiceCreateOrUpdate);
    const [isConfirm, setIsConfirm] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const categories = useRef([]);
    const serviceLists = useRef([]);
    const customer = useRef(null);

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

    const init = useCallback(async () => {
        setLoading(true);

        const customerResponse = await customerServices.customerShow(dispatch, params.id);

        if(customerResponse.status === 200) {
            customer.current = customerResponse.data;
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
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    return(
        <>
            <ConfirmDialog />
            <HeaderBar /> 

            <div className="grid">
                <div className="w-full mt-3 p-3">
                    <BackButton isConfirm={isConfirm} />

                    <Card 
                        className="mt-3"
                        title="Add Service On Customer"
                        subTitle={customer.current ? `${customer.current.reference_id} - ${customer.current.name}`  : ""}
                    >
                        <div className="grid">
                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full">
                                    <label> Customer Name </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        value={customer.current ? customer.current.name : ""}
                                        disabled={true}
                                    />
                                </div>
                                <ValidationMessage field="name" />
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
                                            onCategoryChangeHandler(e.value)
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <small id="username-help"> {payload.category_id.description}</small>
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
                                            updatePayload.fees = e.value.fees;
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <small id="username-help"> {payload.category_service_id.description}</small>
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
                            
                            <div className="col-12 md:col-12 mt-3">
                                <Button 
                                    size="small"
                                    label="CREATE"
                                    disabled={loading}
                                    loading={loading}
                                    onClick={() => {} }
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}