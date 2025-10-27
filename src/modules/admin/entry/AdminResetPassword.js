import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ValidationMessage } from "../../../components/ValidationMessage";
import { Button } from "primereact/button";
import { adminPayloads } from "../adminPayloads";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { payloadHandler } from "../../../utilities/handlers";
import { adminServices } from "../adminService";

export const AdminResetPassword = () => {

    const [payload, setPayload] = useState(adminPayloads.changePassword);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changePasswordHandler = async () => {
        setLoading(true);
        const response = await adminServices.store(dispatch, payload);
        if(response.status === 200) {
            navigate(-1);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="w-full mt-3 p-3">
                <Card 
                    className="mt-3"
                    title="Change Password"
                >
                    <div className="grid">
                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    type="password"
                                    className="w-full"
                                    placeholder="Enter Old Password"
                                    disabled={loading}
                                    value={payload.old_password}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "old_password", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="old_password" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    type="password"
                                    className="w-full"
                                    placeholder="Enter New Password"
                                    disabled={loading}
                                    value={payload.password}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="password" />
                        </div>

                        <div className="col-3 md:col-3 mt-3">
                            <div className="w-full">
                                <InputText 
                                    className="w-full"
                                    placeholder="Enter Confirm Password"
                                    disabled={loading}
                                    value={payload.confirm_password}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "confirm_password", (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="confirm_password" />
                        </div>

                        <div className="col-12 md:col-12 mt-3">
                            <Button 
                                size="small"
                                label="Create"
                                disabled={loading}
                                loading={loading}
                                onClick={() => changePasswordHandler() }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}