import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/path";

export const ForgetPassword = () => {

    const navigate = useNavigate();

    return(
        <div className="w-full flex align-items-start justify-content-start bg-gray-900">
            <Button 
                style={{ background: "#454545", color: 'white', margin: '1rem'}}
                icon="pi pi-arrow-left"
                onClick={() => navigate(-1)}
            />

            <div className="w-full flex align-items-center justify-content-center min-h-screen bg-gray-900">
                <Card
                    title="Forget Password" 
                    subTitle="Verify your email to reset your password" 
                    className="w-full md:w-30rem"
                >
                    <InputText 
                        placeholder="Email" 
                        className="w-full mb-3" 
                    />

                    <Button 
                        className="w-full mb-3 p-3 mb-3"
                        size="small"
                        label="Send Verification Code"
                        onClick={() => { navigate(paths.VERIFY_OTP) }}
                    />
                </Card>
            </div>
        </div>
    )
}