import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { payloadHandler } from "../../../utilities/handlers";
import { settingPayloads } from "../settingPayloads";
import { settingServices } from "../settingServices";
import { Dropdown } from "primereact/dropdown";
import { updateError } from "../../shareSlice";

export const CreateService = () => {

    const [payload, setPayload] = useState(settingPayloads.servcieCreateOrUpdate);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const categories = useRef([]);

    const createServiceHandler = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.category_id = payload.category_id.code;
        const response = await settingServices.serviceStore(dispatch, updatePayload);

        if(response.status === 200) {
            dispatch(updateError(null));
            await settingServices.serviceIndex(dispatch, settingPayloads.servicePaginateParams);
        }

        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        const result = await settingServices.categoryIndex(dispatch, {...settingPayloads.categoryPaginateParams, filter: "status", value: "ACTIVE"});
        if(result.status === 200) {
            categories.current = result.data.data.map((value) => {
                return {
                    name: value.label,
                    code: value.id
                }
            })
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);
    return (
            <div className="w-full">
                <Card 
                    title="Create Service"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Choose Category </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Category"
                                    options={categories.current}
                                    value={payload.category_id}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "category_id", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="category_id" />
                        </div>

                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Service Type </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Service Type"
                                    disabled={loading}
                                    value={payload.service_type}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "service_type", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="service_type" />
                        </div>

                        <div className="col-2 md:col-2">
                            <div className="w-full">
                                <label> Fees </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Fees"
                                    disabled={loading}
                                    value={payload.fees}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "fees", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="fees" />
                        </div>

                        <div className="col-4 md:col-4">
                            <div className="w-full">
                                <label> Description </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Description"
                                    disabled={loading}
                                    value={payload.description}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "description", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="description" />
                        </div>

                        <div className="col-12 md:col-12 mt-1">
                            <Button 
                                size="small"
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => createServiceHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
    )
}