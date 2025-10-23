export const ColumnDate = ({value}) => {

    return(
        <span> { new Date(value).toLocaleString() } </span>
    )
}