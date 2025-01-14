import { BrowserRouter } from "react-router-dom"
import { SetRoutes } from "./routes"
import Navbar from "@/components/Navbar"
 import { AuthContextProvider } from "./context/AuthContext"
 
 const App = () => {
   return (
     <AuthContextProvider> 
      <BrowserRouter>
      <Navbar />
      <SetRoutes />
      </BrowserRouter>
      </AuthContextProvider>
   )
 }
 
 export default App