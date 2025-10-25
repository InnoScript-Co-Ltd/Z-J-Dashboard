import { Card } from "primereact/card";
import { Notification } from "../../../components/Notification";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { adminPayloads } from "../adminPayloads";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { HeaderBar } from "../../../components/HeaderBar";
import { BackButton } from "../../../components/BackButton";
import { adminServices } from "../adminService";

export const CreateAdmin = () => {

    const [payload, setPayload] = useState(adminPayloads.create);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createUserHandler = async () => {
        setLoading(true);
        const response = await adminServices.store(dispatch, payload);
        if(response.status === 200) {
            navigate(-1);
        }
        setLoading(false);
    }

    return (
        <>
            <HeaderBar /> 

            <div className="w-full mt-3 p-3">
                <BackButton />

                <Card 
                    className="mt-3"
                    title="Create Administrator Account"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter First Name"
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
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Last Name"
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
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Email Address"
                                    disabled={loading}
                                    value={payload.email}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>


                         <div className="col-3 md:col-3 mt-3">
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    className="w-full"
                                    placeholder="Enter Password"
                                    type={show ? "text" : "password"}
                                    disabled={loading}
                                    value={payload.password}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />

                                <Button icon={`pi ${show ? 'pi-eyeclose' : 'pi-eye-slash'}`} onClick={ () => setShow(!show)} />
                                
                            </div>
                            <ValidationMessage field="password" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => createUserHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}