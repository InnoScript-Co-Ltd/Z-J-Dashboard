import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { payloadHandler } from "../../../utilities/handlers";
import { settingPayloads } from "../settingPayloads";
import { settingServices } from "../settingServices";

export const CreateCategory = () => {

    const [payload, setPayload] = useState(settingPayloads.categoryCreateOrUpdate);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const createCategoryeHandler = async () => {
        setLoading(true);
        let updatePayload = {...payload};
        updatePayload.label = payload.label.toUpperCase();
        
        const response = await settingServices.categoryStore(dispatch, updatePayload);

        if(response.status === 200) {
            await settingServices.categoryIndex(dispatch, settingPayloads.categoryPaginateParams);
        }

        setLoading(false);
    }

    return (
            <div className="w-full">
                <Card 
                    title="Create Category"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Label </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Category Label"
                                    disabled={loading}
                                    value={payload.label.toUpperCase()}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "label", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="label" />
                        </div>

                        <div className="col-9 md:col-9">
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
                                onClick={() => createCategoryeHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
    )
}