import moment from "moment";

export const ColumnDate = ({value}) => {

    return(
        <span> { moment(value).format("DD-MM-YYYY hh:mm:ss A")} </span>
    )
}