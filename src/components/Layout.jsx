import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import SidebarLayout from "./Sidebar";


const Layout = () => {
    return (
        <>
            <SidebarProvider>
                <SidebarLayout />

                <div className="h-lvh bg-gray-100">
                    <SidebarTrigger className='' />
                </div>

                <main className="flex w-full p-4 bg-gray-100">
                    {/* <div className="container mx-auto"> */}
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>

            </SidebarProvider>
        </>
    )
}

export default Layout