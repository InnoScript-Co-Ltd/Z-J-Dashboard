import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { confirmDialog } from 'primereact/confirmdialog';
import { useEffect } from "react";

export const BackButton = ({isConfirm}) => {

    const navigate = useNavigate();

    const accept = () => {
        navigate(-1);
    }

    const reject = () => { }

    const dialogBox = () =>  {
        confirmDialog({
            message: "Are you sure want to back without saving",
            header: "Confirmation",
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        })
    } 

    useEffect(() => {
        return () => {
            confirmDialog().hide();
        }
    },[]);

    return(
        <>
            <Button
                size="small"
                icon="pi pi-arrow-left" 
                outlined
                label="BACK"
                onClick={() => isConfirm ? dialogBox(): navigate(-1)}
            />
        </>
    )
}