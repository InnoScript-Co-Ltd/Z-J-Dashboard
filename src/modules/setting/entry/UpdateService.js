import { useCallback, useEffect, useRef, useState } from "react";
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

    const categories = useRef([]);

    const updateServiceHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.category_id = payload.category_id.code;
        await settingServices.serviceUpdate(dispatch, updatePayload, params.id);
        setLoading(false);
    }

    const init = useCallback( async () => {
        setLoading(true);
        const result = await settingServices.categoryIndex(dispatch, { filter: "status", value: "ACTIVE"});

        if(result.status === 200) {
            categories.current = result.data.map((value) => {
                return {
                    code: value.id,
                    name: value.label
                }
            });

            await settingServices.serviceShow(dispatch, params.id);
        }

        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(service) {
            let updatePayload = {...service};
            updatePayload.category_id = categories.current.filter(value => value.code === service.category_id)[0];
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
                    title="Update Service"
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
                                        value={payload.service_type ? payload.service_type : ""}
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
                                        value={payload.fees ? payload.fees : ""}
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
                                    label="Update"
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