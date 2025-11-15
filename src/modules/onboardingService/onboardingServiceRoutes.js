import { paths } from "../../constants/path";
import { CreateOnboardingService } from "./entry/CreateOnboardingService";
import { UpdateOnboardingService } from "./entry/UpdateOnboardingService";
import { OnboardingServiceList } from "./view/OnboardingServiceList";

export const onboardingServiceRoutes = [
    {
        path: `${paths.ONBOARDING_SERVICE}`,
        element: <OnboardingServiceList />     
    },
    {
        path: `${paths.ONBOARDING_SERVICE}/update/:id`,
        element: <UpdateOnboardingService />
    },
    {
        path: `${paths.ONBOARDING_SERVICE}/create`,
        element: <CreateOnboardingService />     
    }
]