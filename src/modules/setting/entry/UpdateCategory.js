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
import { generalStatusEnum } from "../../../constants/settings";

export const UpdateCategory = () => {

    const { category } = useSelector(state => state.setting);

    const [payload, setPayload] = useState(settingPayloads.categoryCreateOrUpdate);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const updateCategoryHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.status = payload.status.code;
        updatePayload.label = payload.label.toLocaleUpperCase();
        await settingServices.categoryUpdate(dispatch, updatePayload, params.id);
        setLoading(false);
    }

    const init = useCallback( async () => {
        setLoading(true);
        await settingServices.categoryShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(category) {
            let updatePayload = {...category};
            updatePayload.status = generalStatusEnum.filter(value => value.code === category.status)[0];
            setPayload(updatePayload);
        }
    }, [category]);

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
                                    <label> Label </label>
                                    <InputText 
                                        className="w-full mt-1"
                                        placeholder="Enter Label"
                                        disabled={loading}
                                        value={payload.label ? payload.label.toLocaleUpperCase() : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "label", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="fees" />
                            </div>

                            <div className="col-3 md:col-3">
                                <div className="w-full">
                                    <label> Choose Status </label>
                                    <Dropdown
                                        className="w-full mt-1"
                                        placeholder="Choose Service Type"
                                        options={generalStatusEnum}
                                        value={payload.status}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="status" />
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
                                    onClick={() => updateCategoryHandler() }
                                />
                            </div>
                    </div>
                </Card>
            </div>
        </>
    )
}