import { InputText } from "primereact/inputtext";
import { payloadHandler } from "../../../utilities/handlers";
import { useCallback, useEffect, useState } from "react";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { adminPayloads } from "../adminPayloads";
import { useDispatch, useSelector } from "react-redux";
import { adminServices } from "../adminService";

export const AdminAccountUpdate = () => {
    
    const [payload, setPayload] = useState(adminPayloads.update);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const { admin } = useSelector((state) => state.admin);

    const dispatch = useDispatch();

    const updateAdminAccountHandler = async () => {
        setLoading(true);
        await adminServices.updateProfile(dispatch, payload);
        setLoading(false);
    }

    const init = useCallback(async () => {
        if(admin) {
            setPayload(admin);
        }
    }, [admin]);

    useEffect(() => {
        init();
    }, [init]);

    return (
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
                <div className="w-full">
                    <InputText 
                        className="w-full"
                        placeholder="Enter Phone"
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
                    label="Update"
                    disabled={loading}
                    loading={loading}
                    onClick={() => updateAdminAccountHandler() }
                />
            </div>
        </div>
    )
}   