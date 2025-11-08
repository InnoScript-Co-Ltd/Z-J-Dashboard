import { Button } from "primereact/button"

export const FooterPaginate = ({total, onChangePaginate}) => {

    return(
        <div className='flex items-center justify-content-between'>
            <label> Total - { total ? total : 0 } </label>
            <div className=' flex align-items-center gap-3'>
                <Button
                    outlined
                    icon="pi pi-refresh"
                    size="small"
                    onClick={() => onChangePaginate()}
                />
            </div>
        </div>
    )
}