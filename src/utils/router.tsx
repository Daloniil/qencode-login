import {createBrowserRouter} from "react-router-dom";
import {Login} from "../pages/Login";
import {CreateNewPassword} from "../pages/CreateNewPassword";
import {ResetPassword} from "../pages/ResetPassword";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/reset-password',
        element: <ResetPassword/>,
    },
    {
        path: '/create-new-password',
        element: <CreateNewPassword/>,
    },
]);