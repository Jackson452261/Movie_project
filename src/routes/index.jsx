import { useRoutes } from "react-router-dom";
import { Home  } from "@/pages"
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Account from "@/pages/Account";
import ProtectRoute from "@/components/ProtectRoute";

export const SetRoutes = () =>
{
 return useRoutes([
{
   path: '/',
   element: <Home />
},
 
{
   path: '/login',
   element: <Login />
},
{
   path: '/signup',
   element: <Signup />
},
{
   path: '/account',
   element: <ProtectRoute> <Account /> </ProtectRoute>
},
    ])
}
