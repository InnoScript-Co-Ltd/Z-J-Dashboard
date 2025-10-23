import { useEffect, useState } from 'react';
import { statusOptions } from '../../constants/settings';
import { Tag } from 'primereact/tag';

export const ColumnStatus = ({ status }) => {

    const [dataSource, setDataSource] = useState(null);

    useEffect(() => {
        if(status) {
            const getStatus = statusOptions.filter(value => value.status === status)[0];
            setDataSource(getStatus);
        }
    },[status]);

    return(
        <>
            { dataSource && (
                <Tag
                    value={dataSource.status}
                    severity={dataSource.color}
                />
            )}  
        </>
    )
}