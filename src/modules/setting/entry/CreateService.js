import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { payloadHandler } from "../../../utilities/handlers";
import { settingPayloads } from "../settingPayloads";
import { settingServices } from "../settingServices";
import { Dropdown } from "primereact/dropdown";

export const CreateService = () => {

    const [payload, setPayload] = useState(settingPayloads.servcieCreateOrUpdate);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const createServiceHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.service_type = payload.service_type.code;
        const response = await settingServices.serviceStore(dispatch, updatePayload);
        if(response.status === 200) {
            await settingServices.serviceIndex(dispatch, settingPayloads.servicePaginateParams);
        }
        setLoading(false);
    }

    return (
            <div className="w-full">
                <Card 
                    title="Create Service"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Choose Service Types </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Service Type"
                                    options={settingPayloads.yearOfInsurances}
                                    value={payload.service_type}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "service_type", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="service_type" />
                        </div>

                        <div className="col-3 md:col-3">
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

                        <div className="col-6 md:col-6">
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
                                label="Update"
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