import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { categoryPayloads } from "../categoryPayloads";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { categoryServices } from "../categoryServices";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { setcreateFrom } from "../categorySlice";
import { updateError } from "../../shareSlice";

export const CreateCategory = () => {

    const { createForm } = useSelector(state => state.category);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(createForm);

    const dispatch = useDispatch();

    const createCategoryeHandler = async () => {
        setLoading(true);
        const categoryResponse = await categoryServices.categoryStore(dispatch, payload);

        if(categoryResponse.status === 200) {
            const createCategoryResponse = await categoryServices.categoryIndex(dispatch, categoryPayloads.categoryPaginateParams);

            if(createCategoryResponse.status === 200) {
                dispatch(updateError(null));
            }
        }
        setLoading(false);
    }

    return(
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
                                value={payload.label}
                                onChange={(e) => payloadHandler(payload, e.target.value, "label", (updatePayload) => {
                                    dispatch(setcreateFrom(payload));
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
                                    dispatch(setcreateFrom(payload));
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="description" />
                    </div>

                    <div className="col-12 md:col-12 mt-1">
                        <Button 
                            size="small"
                            label="CREATE"
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