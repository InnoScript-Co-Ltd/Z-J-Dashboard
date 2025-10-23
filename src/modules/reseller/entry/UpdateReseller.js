import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { ValidationMessage } from "../../../components/ValidationMessage"
import { resellerPayloads } from "../resellerPayload"
import { payloadHandler } from "../../../utilities/handlers"
import { Button } from "primereact/button"
import { Image } from "primereact/image"
import { resellerServices } from "../resellerServices"
import { useParams } from "react-router-dom"
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

const genderList = [
  { name: "MALE", code: "MALE" },
  { name: "FEMALE", code: "FEMALE" },
];

const statusList = [
  { name: "ACTIVE", code: "ACTIVE" },
  { name: "PENDING", code: "PENDING" },
];

export const UpdateReseller = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(resellerPayloads.update);

    const { reseller } = useSelector((state) => state.reseller);

    const dispatch = useDispatch();
    const params = useParams();

    const updateHandler = async () => {
        setLoading(true);
        let updatePayload = { ...payload };
        updatePayload.status =  payload.status.code;
        updatePayload.gender = payload.gender.code;

        await resellerServices.update(dispatch, params.id, updatePayload);
    }

    const init = useCallback (async () => {
        setLoading(true);
        
        if(reseller) {
            let updatePayload = {...reseller};
            updatePayload.gender = genderList.find(value => value.code === reseller.gender);
            updatePayload.status = statusList.find(value => value.code === reseller.status);   
            setPayload(updatePayload);
        }
        
        setLoading(false);
    }, [reseller]);

    useEffect(() => {
        init();
    }, [init]);

    return(
        <>
            { payload && reseller && (
                <div className="grid">
                    <div className="col-3 mt-3">
                        <div className="w-full flex flex-column justify-content-center align-items-center">
                            <Image 
                                className="img-circle"
                                src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                            />

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Rate </label>
                                <Rating value={5} readOnly cancel={false} />
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Level </label>
                                <Tag severity={"success"} value={"Level 1"} />
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Remaining Ticket </label>
                                <span> 300 </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Total Ticket Usage </label>
                                <span> 4,000 </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Ticket Rate </label>
                                <span> 0.8 Baht </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Remaining Amount </label>
                                <span> {0.8 * 300 } Baht </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Join Date </label>
                                <span> {new Date(reseller.created_at).toLocaleString()} </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Updated Date </label>
                                <span> {new Date(reseller.updated_at).toLocaleString()} </span>
                            </div>

                            <div className="w-full flex flex-row justify-content-between align-items-center p-3">
                                <label className="mr-3"> Account Status </label>
                                <Tag severity={"success"} value={reseller.status} />
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="grid">
                            <div className="col-12 mt-3">
                                <label className="form-header"> Update Reseller Account Information </label>
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText 
                                        className="w-full"
                                        placeholder="Enter reseller first name"
                                        disabled={loading}
                                        value={payload.first_name || ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "first_name", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="first_name" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText 
                                        className="w-full"
                                        placeholder="Enter reseller last name"
                                        disabled={loading}
                                        value={payload.last_name || ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "last_name", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="last_name" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-venus"></i>
                                    </span>
                                    <Dropdown
                                        placeholder="Select gender type"
                                        options={genderList}
                                        value={payload.gender || ""}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value, "gender", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="gender" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText 
                                        className="w-full"
                                        placeholder="Enter reseller phone number"
                                        disabled={loading}
                                        value={payload.phone || ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="phone" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-info-circle"></i>
                                    </span>
                                    <Dropdown
                                        placeholder="Select status"
                                        options={statusList}
                                        value={payload.status || ""}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="status" />
                            </div>

                            <div className="col-3 md:col-3 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <InputText 
                                        className="w-full"
                                        placeholder="Enter reseller NRC number"
                                        disabled={loading}
                                        value={payload.nrc || ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="nrc" />
                            </div>

                            <div className="col-3 md:col-6 mt-3">
                                <div className="w-full p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText 
                                        className="w-full"
                                        placeholder="Enter reseller address"
                                        disabled={loading}
                                        value={payload.address || ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "address", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="address" />
                            </div>

                            <div className="col-6 mt-3">
                                <Image
                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                    preview
                                />
                            </div>

                            <div className="col-6 mt-3">
                                <Image
                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                    preview
                                />
                            </div>

                            <div className="col-12 mt-3">
                                <Button 
                                    size="small"
                                    label="Update"
                                    onClick={() => updateHandler()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}