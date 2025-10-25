import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/path";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const VerifyCode = () => {

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
                    subTitle="Enter the verification code sent to your email" 
                    className="w-full md:w-30rem"
                >
                    <Message 
                        text="Please check your email for the verification code." 
                        className="w-full mb-3"
                    />

                    <InputText 
                        placeholder="Code" 
                        className="w-full mb-3" 
                    />

                    <Button 
                        className="w-full mb-3 p-3 mb-3"
                        size="small"
                        label="Verify Code"
                        onClick={() => { navigate(paths.RESET_PASSWORD) }}
                    />
                </Card>
            </div>
        </div>
    )
}