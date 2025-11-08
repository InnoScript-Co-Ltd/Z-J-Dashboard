import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const HeaderTableSearch = ({disabled, placeholder, onSearch}) => {

    const [searchKey, setSearchKey] = useState("");

    return(
        <div className="w-full p-inputgroup flex-1">
            <InputText
                size={"small"}
                disabled={disabled}
                placeholder={placeholder}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyUp={(e) => {
                    setSearchKey(e.target.value);
                    if (e.key === "Enter") {
                        onSearch(e.target.value);
                    }
                }}
            />

            <Button 
                size="small"
                label={"SEARCH"}
                icon="pi pi-search"
                onClick={() => {
                    onSearch(searchKey);
                }}
            />
        </div>
    )
}