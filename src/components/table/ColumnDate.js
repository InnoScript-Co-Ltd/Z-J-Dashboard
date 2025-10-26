import dayjs from "dayjs";

export const ColumnDate = ({value}) => {

    return(
        <span> { dayjs(value).format('DD-MM-YYYY HH:mm:ss A') } </span>
    )
}