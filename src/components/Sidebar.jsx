import { User, Home, Users, Locate, File, Files, SquareChartGantt, LogOut as LogoutIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";



const menuList = [{
    group: 'General',
    items: [
        {
            title: "Home",
            href: "/welcome",
            icon: Home
        },
        {
            title: 'Users',
            href: '/users',
            icon: Users
        },
        {
            title: 'Profile',
            href: '/profile',
            icon: Locate
        },
        {
            title: 'About',
            href: '/about',
            icon: User
        }
    ]
},
{
    group: 'Rincian',
    items: [
        {
            title: 'Sub Kegiatan',
            href: '/subkegiatan',
            icon: Files
        },
        {
            title: 'Aktifitas Pengawasan',
            href: '/aktifitas',
            icon: File
        },
        {
            title: 'Rincian',
            href: '/rincian',
            icon: SquareChartGantt
        }
    ]
}]

const handleMenuItemClick = (e, href) => {
    e.preventDefault(); // prevent default link behavior
    window.location.href = href; // navigate to the desired URL
}

const SidebarLayout = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                {
                    menuList.map((menu, index) => {
                        return (
                            <SidebarGroup key={index}>
                                <SidebarGroupLabel>
                                    {menu.group}
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {
                                            menu.items.map((item, index) => {
                                                return (
                                                    <SidebarMenuItem key={index}>
                                                        <SidebarMenuButton asChild onClick={(e) => handleMenuItemClick(e, item.href)}>
                                                            <a href={item.href}>
                                                                <item.icon />
                                                                <span>{item.title}</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                )
                                            })
                                        }
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )
                    })
                }
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton className="bg-black hover:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 text-white" asChild>
                                <a href="/logout">
                                    <LogoutIcon />
                                    <span className="font-bold text-white">Logout</span>
                                </a>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>




        </Sidebar>
    )
}

export default SidebarLayout