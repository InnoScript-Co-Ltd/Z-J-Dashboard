import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Password } from "primereact/password"
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/path";

export const ResetPassword = () => {

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
                    title="Reset Password" 
                    subTitle="Enter your new password" 
                    className="w-full md:w-30rem"
                >

                    <Password 
                        placeholder="New Password" 
                        className="w-full mb-3"
                        toggleMask
                    />

                    <Password 
                        placeholder="Confirm New Password" 
                        className="w-full mb-3"
                        toggleMask
                    />

                    <Button 
                        className="w-full mb-3 p-3" 
                        size="small"
                        label="Reset Password"
                        onClick={() => { navigate(paths.LOGIN) }}
                    />
                </Card>
            </div>
        </div>
    )
}