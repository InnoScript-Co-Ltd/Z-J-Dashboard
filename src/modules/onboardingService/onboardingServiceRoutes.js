import { paths } from "../../constants/path";
import { CreateOnboardingService } from "./entry/CreateOnboardingService";

export const onboardingServiceRoutes = [
    {
        path: `${paths.ONBOARDING_SERVICE}/create/:id`,
        element: <CreateOnboardingService />
    },
]