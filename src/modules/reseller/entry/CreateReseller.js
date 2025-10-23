import { Card } from "primereact/card"
import { HeaderBar } from "../../../components/HeaderBar"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resellerPayloads } from "../resellerPayload"
import { payloadHandler } from "../../../utilities/handlers"
import { postRequest } from "../../../utilities/api"
import { endpoints } from "../../../constants/endpoints"
import { useDispatch } from "react-redux"
import { ValidationMessage } from "../../../components/ValidationMessage"
import { Dropdown } from "primereact/dropdown"
import { updateError } from "../../shareSlice"
import { BackButton } from "../../../components/BackButton";

export const CreateReseller = () => {

    const [payload, setPayload] = useState(resellerPayloads.create);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const genderList = [
        { name: 'MALE', code: 'MALE' },
        { name: 'FEMALE', code: 'FEMALE' },
    ];

    const statusList = [
        { name: 'ACTIVE', code: 'ACTIVE' },
        { name: 'PENDING', code: 'PENDING' },
    ];

    const createResellerHandler = async () => {
        setLoading(true);

        let requestPayload = {...payload};
        requestPayload.gender = payload.gender.code;
        requestPayload.status = payload.status.code;

        const requestResult = await postRequest(endpoints.user, requestPayload, dispatch);

        if(requestResult.status === 200) {
            dispatch(updateError(null));
            navigate(-1);
        }
        
        setLoading(false);
    }

    return(
        <>
            <HeaderBar />
            
            <div className="w-full mt-3 p-3">
                <BackButton />

                <Card 
                    className="mt-3"
                    title="Create Reseller Account"
                    subTitle="Track sales & commissions in real time"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter reseller first name"
                                    disabled={loading}
                                    value={payload.first_name}
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
                                    value={payload.last_name}
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
                                    value={payload.gender}
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
                                    value={payload.phone}
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
                                    value={payload.status}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value, "status", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="status" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <Password 
                                    className="w-full"
                                    placeholder="Enter reseller account password"
                                    disabled={loading}
                                    toggleMask
                                    value={payload.password}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="password" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => createResellerHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}