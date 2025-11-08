import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useRef, useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { updateError } from "../../shareSlice";
import { categoryServiceServices } from "../categoryServiceServices";
import { categoryServicePayloads } from "../categoryServicePayloads";
import { setCategoryServiceCreateFrom } from "../categoryServiceSlice";
import { Dropdown } from "primereact/dropdown";
import { categoryServices } from "../../categories/categoryServices";

export const CreateCategoryService = () => {

    const { categoryServiceCreateForm } = useSelector(state => state.categoryService);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryServiceCreateForm);

    const dispatch = useDispatch();
    const categories = useRef([]);

    const createCategoryServiceHandler = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.category_id = payload.category_id.code;

        const categoryServiceResponse = await categoryServiceServices.categoryServiceStore(dispatch, updatePayload);

        if(categoryServiceResponse.status === 200) {
            const createCategoryServiceResponse = await categoryServiceServices.categoryServiceIndex(dispatch, categoryServicePayloads.categoryServicePaginateParams);

            if(createCategoryServiceResponse.status === 200) {
                dispatch(updateError(null));
            }
        }
        setLoading(false);
    }

    const init = useCallback(async () => {
        setLoading(true);
        const categoryResponse = await categoryServices.categoryIndex(dispatch, { filter: "status", value: "ACTIVE"});

        if(categoryResponse.status === 200) {
            categories.current = categoryResponse.data.map((value) => {
                return {
                    code: value.id,
                    name: value.label
                }
            })
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    return(
        <div className="w-full">
            <Card 
                title="Create Category Service"
            >
                <div className="grid">
                    <div className="col-4 md:col-4">
                        <div className="w-full">
                            <label> Choose Category </label>
                            <Dropdown
                                className="w-full mt-1"
                                placeholder="Choose Service Category"
                                options={categories.current}
                                value={payload.category_id}
                                optionLabel="name"
                                onChange={(e) => payloadHandler(payload, e.value, "category_id", (updatePayload) => {
                                    dispatch(setCategoryServiceCreateFrom(payload));
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="category_id" />
                    </div>

                    <div className="col-4 md:col-4">
                        <div className="w-full">
                            <label>Service Name </label>
                            <InputText 
                                className="w-full mt-1"
                                placeholder="Enter Category Service Name"
                                disabled={loading}
                                value={payload.name}
                                onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                    dispatch(setCategoryServiceCreateFrom(payload));
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="name" />
                    </div>

                    <div className="col-4 md:col-4">
                        <div className="w-full">
                            <label>Service Fees </label>
                            <InputText 
                                className="w-full mt-1"
                                placeholder="Enter Service Fees"
                                disabled={loading}
                                value={payload.fees}
                                onChange={(e) => payloadHandler(payload, e.target.value, "fees", (updatePayload) => {
                                    dispatch(setCategoryServiceCreateFrom(payload));
                                    setPayload(updatePayload);
                                })}
                            />
                        </div>
                        <ValidationMessage field="fees" />
                    </div>

                    <div className="col-12 md:col-12">
                        <div className="w-full">
                            <label> Description </label>
                            <InputText 
                                className="w-full mt-1"
                                placeholder="Enter Description"
                                disabled={loading}
                                value={payload.description}
                                onChange={(e) => payloadHandler(payload, e.target.value, "description", (updatePayload) => {
                                    dispatch(setCategoryServiceCreateFrom(payload));
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
                            onClick={() => createCategoryServiceHandler() }
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}