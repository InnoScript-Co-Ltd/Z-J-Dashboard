import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"


export const BackButton = () => {

    const navigate = useNavigate();

    return(
        <Button
            size="small"
            icon="pi pi-arrow-left" 
            outlined
            label="Back"
            onClick={() => navigate(-1)}
        />
    )
}