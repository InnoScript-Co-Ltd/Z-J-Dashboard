
import { Button } from "primereact/button"
import { Skeleton } from 'primereact/skeleton';
import { Image } from "primereact/image"
import { Toolbar } from "primereact/toolbar"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/path";
import { adminServices } from "../modules/admin/adminService";
import { keys } from "../constants/settings";
import Logo from "../assets/images/logo.png";

export const HeaderBar = () => {

    const [loading, setLoading] = useState(false);

    const { admin } = useSelector((state) => state.admin);

    const dispath = useDispatch();
    const navigate = useNavigate();

    const init = useCallback( async () => {
        setLoading(true);
        await adminServices.profile(dispath);
        setLoading(false);
    }, [dispath]);

    useEffect(() => {
        init();
    }, [init])

    const StartContent = () => {
        return (
            <div className="flex align-items-start md:flex-row">
                { loading && (
                    <>
                        <Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton>
                    <div className="flex flex-column">
                        <Skeleton width="10rem" height="2rem"></Skeleton>
                        <Skeleton width="20rem" height="2rem" className="mt-1"> </Skeleton>
                    </div>
                    </>
                )}

                { !loading && admin && (
                    <>
                        <Image src={Logo} alt="Image" width="40" height="40" className="mr-2" onClick={() => navigate(paths.HOME)} style={{cursor: "pointer"}} />
                        <div className="flex flex-column" onClick={() => navigate(paths.HOME)} style={{cursor: "pointer"}}>
                            { admin && <label> <b> {admin.first_name + " " + admin.last_name} </b> </label>}
                            <small> Z&J Thai CRM Management System </small>
                        </div>
                    </>
                )}
            </div>
        )
    }

    const EndContent = () => {
        return (
            <>
                <Button icon="pi pi-user" rounded text aria-label="Profile" onClick={() => navigate(paths.PROFILE)} />
                <Button icon="pi pi-power-off" rounded text aria-label="Logout" onClick={() => {
                    localStorage.removeItem(keys.API_TOKEN);
                    navigate(paths.LOGIN);
                }} />
            </>

        )
    }

    return(
        <>
            <Toolbar 
                start={ <StartContent /> }
                end={ <EndContent /> }
            />
        </>
    )
}