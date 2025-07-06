import { User, Home, Users, Locate, File, Files, SquareChartGantt, LogOut as LogoutIcon, UserCheck } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode'



const ADMIN = ['admin']
const USER = ['admin', 'user']


const menuList = [{
    group: 'General',
    items: [
        {
            title: "Home",
            href: "/welcome",
            icon: Home,
            allowedRoles: USER
        },
        {
            title: 'Users',
            href: '/users',
            icon: Users,
            allowedRoles: ADMIN
        },
        {
            title: 'Pegawai',
            href: '/pegawai',
            icon: UserCheck,
            allowedRoles: ADMIN
        },
        {
            title: 'Profile',
            href: '/profile',
            icon: Locate,
            allowedRoles: USER
        },
        {
            title: 'About',
            href: '/about',
            icon: User,
            allowedRoles: USER
        }
    ]
},
{
    group: 'Rincian',
    items: [
        {
            title: 'Sub Kegiatan',
            href: '/subkegiatan',
            icon: Files,
            allowedRoles: ADMIN
        },
        {
            title: 'Aktifitas Pengawasan',
            href: '/aktifitas',
            icon: File,
            allowedRoles: USER
        },
        {
            title: 'Rincian',
            href: '/rincian',
            icon: SquareChartGantt,
            allowedRoles: USER
        }
    ]
}]


const SidebarLayout = () => {

    const token = useSelector(selectCurrentToken);
    // Jika token belum ada, tunggu hingga Redux state terupdate
    if (!token) {
        // Bisa merender placeholder atau null sementara menunggu token tersedia
        console.log('tunggu');
        return null;
        // return <p>Loading...</p>;
    }

    const roleUser = token ? jwtDecode(token).userInfo.role : null
    // console.log('decoded dari RequireAuth: ', decoded);
    // const role = decoded ? decoded.userInfo.role : []



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
                                            menu.items
                                                .filter(item => item.allowedRoles.includes(roleUser)) // filter menu allowedRoles dari user yg login
                                                .map((item, index) => {
                                                    return (
                                                        <SidebarMenuItem key={index}>
                                                            <SidebarMenuButton asChild>
                                                                <Link to={item.href}>
                                                                    <item.icon />
                                                                    <span>{item.title}</span>
                                                                </Link>
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
                                <Link to="/logout">
                                    <LogoutIcon />
                                    <span className="font-bold text-white">Logout</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>




        </Sidebar>
    )
}

export default SidebarLayout