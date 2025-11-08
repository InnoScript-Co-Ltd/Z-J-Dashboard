import { Card } from "primereact/card";
import { BackButton } from "../../../components/BackButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPayloads } from "../categoryPayloads";
import { useNavigate, useParams } from "react-router-dom";
import { categoryServices } from "../categoryServices";
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

export const UpdateCategory = () => {

    const { category } = useSelector(state => state.category);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayloads.categoryCreateOrUpdate);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const isConfirm = useRef(true);

    const updateCategoryHandler = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.status = payload.status.code;

        const updateCategoryResponse = await categoryServices.categoryUpdate(dispatch, updatePayload, params.id);

        if(updateCategoryResponse.status === 200) {
            isConfirm.current = false;
            dispatch(updateError(null));
        }

        setLoading(false);
    }

    const delCategoryHandler = async () => {
        setLoading(true);
        const delCategoryResponse = await categoryServices.categoryDestroy(dispatch, params.id);

        if(delCategoryResponse.status === 200) {
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
                await delCategoryHandler();
            },
            reject: () => { }
        });
    }

    const init = useCallback(async () => {
        setLoading(true);
        await categoryServices.categoryShow(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if(category) {
            let updatePayload = { ...category };
            updatePayload.status = generalStatusEnum.filter(value => value.code === category.status)[0];
            setPayload(updatePayload);
        }
    }, [category]);

    return(
        <>
            <ConfirmDialog />
            <HeaderBar />

            <div className="w-full flex flex-row justify-content-between align-items-center mt-3 p-3">
                <BackButton isConfirm={isConfirm.current} />

                { category && category.status !== "ACTIVE" && (
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
                    title="Update Category"
                    subTitle={category ? category.label : ""}
                >
                    <div className="grid">
                        <div className="col-3 md:col-3">
                            <div className="w-full">
                                <label> Label </label>
                                <InputText 
                                    className="w-full mt-1"
                                    placeholder="Enter Label"
                                    disabled={loading}
                                    value={payload.label}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "label", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="label" />
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
                                label="UPDATE"
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