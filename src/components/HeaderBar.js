
import { Button } from "primereact/button"
import { Skeleton } from 'primereact/skeleton';
import { Image } from "primereact/image"
import { Toolbar } from "primereact/toolbar"
import { useCallback, useEffect, useState } from "react"
import { getRequest } from "../utilities/api";
import { endpoints } from "../constants/endpoints";
import { useDispatch } from "react-redux"

export const HeaderBar = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispath = useDispatch();

    const init = useCallback( async () => {
        setLoading(true);
        const requestResult = await getRequest(endpoints.admin, null, dispath);
        setUser(requestResult.data);
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

                { !loading && user && (
                    <>
                        <Image src="/logo192.png" alt="Image" width="40" height="40" className="mr-2" />
                        <div className="flex flex-column">
                            { user && <label> <b> {user.first_name + " " + user.last_name} </b> </label>}
                            <small> Lottery Distribution Management System </small>
                        </div>
                    </>
                )}
            </div>
        )
    }

    const EndContent = () => {
        return (
            <>
                <Button icon="pi pi-user" rounded text aria-label="Profile" />
                <Button icon="pi pi-cog" rounded text aria-label="Setting" />
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