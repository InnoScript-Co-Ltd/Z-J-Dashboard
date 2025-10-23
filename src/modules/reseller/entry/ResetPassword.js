import { useState } from "react";
import { Button } from "primereact/button";
import { Message } from 'primereact/message';
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { resellerServices } from "../resellerServices";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [btnDisable, setDisable] = useState(true);

    const dispatch = useDispatch();
    const params = useParams();

    const generatePassword = () => {
        const num = Math.random() * (18 - 6) + 6;; 

        const chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let newPassword = "";
        
        for (let i = 0; i < num; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(newPassword);
        setDisable(true);
    }

    const resetPassword = async () => {
        if(password === "") {
            setError("Reset password is required")
            return;
        }

        setLoading(true);
        await resellerServices.resetPassword(dispatch, params.id, password);
        setError(null);
        setPassword("");
        setDisable(true);
        setLoading(false); 
    }

    const content = (
        <div className="flex flex-row align-items-center justify-content-center">
            <Button 
                label="Generate Password"
                size="small"
                outlined
                onClick={() => generatePassword() }
            />
                <p className="ml-2"> 
                    Before resetting the password, it is important to copy the password. Click the Copy Icon to copy it.
                    {password && password.length >=6 && (
                        <span> Your generate password is <code style={{ background: "#000", color: "#fff", padding: "5px"}}> {password} </code>. </span>
                    )}
                </p>
                
                {password && password.length >= 6 && (
                    <Button 
                        icon="pi pi-copy"
                        size="small"
                        outlined
                        className="ml-2"
                        tooltip="Copy password"
                        onClick={() => {
                            if (password) {
                                navigator.clipboard.writeText(`Your reset password is - ${password}`);
                                setDisable(false);
                            }
                        }}
                    />
                )}
        </div>
    );

    return(
        <div className="grid">
            <div className="col-12 mt-3">
                <label className="form-header"> Reset Password </label>
                <Message 
                    className="border-primary w-full justify-content-start mt-3"
                    severity="info"
                    content={content}
                />
            </div>

            <div className="col-4 mt-3">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <InputText 
                        placeholder="Password" 
                        value={password}
                        disabled={loading}
                        type={show ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        icon={`pi ${show ? "pi-eye-slash" : "pi-eye"}`}
                        outlined
                        onClick={() => setShow(!show)}
                    />
                </div>
                { error && <span className="error-message"> { error } </span> }
            </div>

            <div className="col-12 mt-3">
                <Button 
                    size="small"
                    label="Reset Password"
                    onClick={() => resetPassword()}
                    disabled={btnDisable}
                />
            </div>
        </div>
    )
}