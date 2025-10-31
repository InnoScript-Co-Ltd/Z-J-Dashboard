import numeral from "numeral"

export const ColumnNumber = ({value}) => {
    
    return (
        <span> {numeral(value).format("0,0") } Baht </span>
    )
}