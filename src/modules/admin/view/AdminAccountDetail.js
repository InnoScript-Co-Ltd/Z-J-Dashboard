import { Image } from 'primereact/image';
import { useSelector } from "react-redux";
import { ColumnStatus } from "../../../components/table/ColumnStatus";
import defaultImage from '../../../assets/images/default.webp';

export const AdminAccountDetail = () => {

    const { admin } = useSelector(state => state.admin);

    return (
        <div className="grid">
            {admin !== null && (
                <div className="col-4">
                    <Image 
                        className='p-3'
                        src={admin.profile ? admin.profile : defaultImage} 
                        alt="Image" 
                        width="200" 
                        preview
                    />
                </div>
            )}

            <div className="col-4">
                {admin !==null && (
                    <>
                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Name </span>
                            <span className="ml-3 font-bold"> {`${admin.first_name} ${admin.last_name}`} </span>
                        </div>

                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Email </span>
                            <span className="ml-3 font-bold"> {admin.email} </span>
                        </div>

                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Phone </span>
                            <span className="ml-3 font-bold"> {admin.phone} </span>
                        </div>

                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Status </span>
                            <span className="ml-3 font-bold"> <ColumnStatus status={admin.status}/> </span>
                        </div>

                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Update At </span>
                            <span className="ml-3 font-bold"> {new Date(admin.updated_at).toLocaleString()} </span>
                        </div>

                        <div className="flex flex-row justify-content-between align-items-center mt-3">
                            <span> Created At </span>
                            <span className="ml-3 font-bold"> {new Date(admin.created_at).toLocaleString()} </span>
                        </div>

                        { admin.status === "DELETED" && (
                            <div className="flex fπlex-row justify-content-between align-items-center mt-3">
                                <span> Created At </span>
                                <span className="ml-3 font-bold"> {new Date(admin.created_at).toLocaleString()} </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}   