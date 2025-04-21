import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"
import Footer from "./shared/Footer"

const MainLayout = () => {
    return (

        <div className="flex flex-col justify-between w-screen h-fit overflow-x-hidden">
            {/* <header className="w-full">
                <Navbar />
            </header> */}
            <div className="h-full w-full overflow-y-auto">
                <Outlet />
            </div>
            {/* <footer className="w-full">
                <Footer />
            </footer> */}
        </div>



    )
}

export default MainLayout