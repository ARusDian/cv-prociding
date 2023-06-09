import React, { PropsWithChildren } from 'react';

import Banner from '@/Components/Jetstream/Banner';
import ResponsiveNavLink from '@/Components/Jetstream/ResponsiveNavLink';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Inertia } from '@inertiajs/inertia';
import { Box, Drawer } from '@mui/material';
import { asset } from '@/Models/Helper';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Dropdown from '@/Components/Jetstream/Dropdown';
import DropdownLink from '@/Components/Jetstream/DropdownLink';
import "../../css/app.css";

interface Props {
    title: string;
    renderHeader?(): JSX.Element;
    isAdministrator?: boolean;
}

export default function DashboardAdminLayout({
    title,
    renderHeader,
    children,
}: PropsWithChildren<Props>) {
    const page = useTypedPage();
    const route = useRoute();

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setIsSidebarOpen(open)
            };
    
    const sideBar = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className="bg-stone-500 py-10 px-5 text-3xl font-bold">
                Dashboard
            </div>
            <ul className="my-10">
                <li>
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink href={route('user.index')} active={route().current('user.index')}>
                        Pengguna
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink href={route('dashboard')}
                        // active={route().current('dashboard')}
                    >
                        History Transaksi
                    </ResponsiveNavLink>
                </li>
            </ul>
        </Box>
    );

    return (
        <div>
            <Banner />
            <nav className="flex justify-between w-full sticky bg-blue-400 py-7 px-10">
                <div className="flex gap-3 max-w-6xl mr-30">
                    <button className="text-3xl md:ml-20 bg-blue-400 text-white hover:bg-blue-600 px-3 py-2"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon fontSize="large" /> Admin
                    </button>
                </div>
                <div className="mr-3 relative">
                    <Dropdown
                        align="right"
                        width="48"
                        renderTrigger={() => (
                            <button className="flex text-sm text-white border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                <SettingsIcon fontSize="large"/>
                            </button>
                            )
                        }
                    >
                        {/* <!-- Account Management --> */}
                        <div className="block px-4 py-2 text-xs text-gray-400">
                            Manage Account
                        </div>

                        <DropdownLink href={route('profile.show')}>
                            Profile
                        </DropdownLink>

                        <div className="border-t border-gray-100"></div>

                        {/* <!-- Authentication --> */}
                        <form onSubmit={logout}>
                            <DropdownLink as="button">Log Out</DropdownLink>
                        </form>
                    </Dropdown>
                </div>
            </nav>
            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    open={isSidebarOpen}
                    onClose={toggleDrawer(false)}
                >
                    {sideBar()}
                </Drawer>
            </React.Fragment>
            {children}
        </div >
    );
}
