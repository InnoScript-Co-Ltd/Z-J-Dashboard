import { useCallback, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../utilities/handlers";
import { settingPayloads } from "../settingPayloads";
import { settingServices } from "../settingServices";
import { Dropdown } from "primereact/dropdown";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { useParams } from "react-router-dom";

export const UpdateService = () => {

    const { service } = useSelector(state => state.setting);

    const [payload, setPayload] = useState(settingPayloads.servcieCreateOrUpdate);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const updateServiceHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.service_type = payload.service_type.code;
        await settingServices.serviceUpdate(dispatch, updatePayload, params.id);
        setLoading(false);
    }

    const init = useCallback( async () => {
        setLoading(true);
        await settingServices.serviceShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(service) {
            let updatePayload = {...service};
            updatePayload.service_type = settingPayloads.yearOfInsurances.filter(value => value.code === service.service_type)[0];
            setPayload(updatePayload);
        }
    }, [service]);

    return (
        <>
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton />
            </div>

            <div className="w-full p-3">
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
                                        value={payload.fees ? payload.fees : ""}
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
                                        value={payload.description ? payload.description : ""}
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
                                    onClick={() => updateServiceHandler() }
                                />
                            </div>
                    </div>
                </Card>
            </div>
        </>
    )
}