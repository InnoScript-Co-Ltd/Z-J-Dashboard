import dayjs from "dayjs";

export const ColumnDate = ({value}) => {

    return(
        <span> { new Date(value).toLocaleDateString('en-CA')} </span>
    )
}