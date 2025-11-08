import { Card } from "primereact/card";
import { BackButton } from "../../../components/BackButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { payloadHandler } from "../../../utilities/handlers";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Dropdown } from "primereact/dropdown";
import { HeaderBar } from "../../../components/HeaderBar";
import { generalStatusEnum } from "../../../constants/settings";
import { Button } from "primereact/button";
import { updateError } from "../../shareSlice";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { paths } from "../../../constants/path";
import { categoryServicePayloads } from "../categoryServicePayloads";
import { categoryServiceServices } from "../categoryServiceServices";
import { categoryServices } from "../../categories/categoryServices";

export const UpdateCategoryService = () => {

    const { categoryService } = useSelector(state => state.categoryService);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryServicePayloads.categoryServiceCreateOrUpdate);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const isConfirm = useRef(true);
    const categories = useRef([]);

    const updateCategoryServiceHandler = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.status = payload.status.code;
        updatePayload.category_id = payload.category_id.code;

        const updateCategoryServiceResponse = await categoryServiceServices.categoryServiceUpdate(dispatch, updatePayload, params.id);

        if(updateCategoryServiceResponse.status === 200) {
            isConfirm.current = false;
            dispatch(updateError(null));
        }

        setLoading(false);
    }

    const delCategoryServiceHandler = async () => {
        setLoading(true);
        const delCategoryServiceResponse = await categoryServiceServices.categoryServiceDestroy(dispatch, params.id);

        if(delCategoryServiceResponse.status === 200) {
            navigate(`${paths.SETTING}`);
        }

        setLoading(false);
    }

    const delDialog = () => {
        confirmDialog({
            message: "Are you sure want to delete this record",
            header: "Delete Confirmation",
            icon: 'pi pi-trash',
            defaultFocus: 'accept',
            accept: async () => {
                await delCategoryServiceHandler();
            },
            reject: () => { }
        });
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
            });

            await categoryServiceServices.categoryServiceShow(dispatch, params.id);
        } 

        setLoading(false);
    }, [dispatch, params]);


    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(categoryService) {
            let updatePayload = { ...categoryService };
            updatePayload.category_id = categories.current.filter(value => value.code === categoryService.category_id)[0];
            updatePayload.status = generalStatusEnum.filter(value => value.code === categoryService.status)[0];
            setPayload(updatePayload);
        }
    }, [categoryService]);


    return(
        <>
            <ConfirmDialog />
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton isConfirm={isConfirm.current} />

                { categoryService && categoryService.status !== "ACTIVE" && (
                    <Button 
                        outlined
                        severity="danger"
                        size="small"
                        icon="pi pi-trash"
                        label="DELETE"
                        onClick={() => delDialog()}
                    />
                )}
            </div>

            <div className="w-full p-3">
                <Card 
                    title="Update Category Service"
                    subTitle={categoryService ? categoryService.name : ""}
                >
                    <div className="grid">
                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Name </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Service Name"
                                    disabled={loading}
                                    value={payload.name}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Choose Status </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    placeholder="Choose Service Category"
                                    options={categories.current.length > 0 ? categories.current : []}
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
                                <label> Service Fees </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Service Fees"
                                    disabled={loading}
                                    value={payload.fees}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "fees", (updatePayload) => {
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

                        <div className="col-12 md:col-12">
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
                                label="UPDATE"
                                disabled={loading}
                                loading={loading}
                                onClick={() => updateCategoryServiceHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}