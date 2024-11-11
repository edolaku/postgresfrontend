import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import SidebarLayout from "./Sidebar";


const Layout = () => {
    return (
        <>
            <SidebarProvider>
                <SidebarLayout />
                <main>
                    <SidebarTrigger />
                    <div className="px-7">
                    <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}

export default Layout