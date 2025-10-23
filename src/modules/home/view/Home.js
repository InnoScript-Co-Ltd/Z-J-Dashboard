import { Button } from "primereact/button"
import { features } from "../../../constants/features"
import { HeaderBar } from "../../../components/HeaderBar"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate();
    return(
        <>
            <HeaderBar />
            <div className="w-full flex justify-content-center align-items-center flex-wrap min-h-screen bg-gray-900">
                <div className="w-6 flex flex-wrap justify-content-center mt-3">
                    { features.map((feature, index) => {
                        return(
                            <Button
                                key={index}
                                className="flex flex-column align-items-center justify-content-center w-10rem h-10rem mr-3 mb-3"
                                severity="info"
                                outlined
                                onClick={() => navigate(feature.link)}
                            >
                                <i className={`pi text-7xl mt-3 ${feature.icon}`}></i>
                                <label className="mt-3"> {feature.name} </label>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}