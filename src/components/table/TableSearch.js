import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const TableSearch = ({ onSearch, placeholder, disabled }) => {

    const [keyword, setKeyword] = useState(null);

    return (
        <div className="w-full p-inputgroup flex-1">
            <InputText
                size={"small"}
                disabled={disabled}
                placeholder={placeholder}
                value={keyword ? keyword : ""}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        onSearch(e.target.value);
                    }
                }}
            />
            <Button 
                size="small"
                icon="pi pi-search"
                onClick={(e) => {
                    onSearch(e.target.value);
                }}
            />
        </div>
    );
};