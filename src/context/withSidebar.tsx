'use client';

import { Sidebar } from '@components';
import { LayoutDashboard, Minus, PencilLine, SquarePen } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavItemProps {
    id: string;
    route: string;
    name: string;
    icons: React.JSX.Element;
}
interface Route {
    id: string;
    route: string;
    name: string;
    icons: React.JSX.Element | undefined;
}

export const WithSideBar = React.memo(() => {
    const BASE_PATH = '/';

    const route = useRouter();
    const pathname = usePathname();

    const onSideBarChange = React.useCallback(
        (data: NavItemProps) => {
            if (data?.route) {
                route.push(data?.route);
            }
        },
        [route]
    );

    const getIcon = React.useCallback((id: string) => {
        switch (id) {
            case 'dashboard':
                return <LayoutDashboard size={18} fill='currentColor' />
            case 'create':
                return <SquarePen size={18} />;
            case 'forms':
                return <PencilLine size={18} />;
            default:
                return <Minus size={18} />;
        }
    }, []);

    const getSidebarMenuItems = React.useMemo<Route[]>(
        () => [
            {
                id: 'dashboard',
                route: `/dashboard`,
                name: 'Dashboard',
                icons: undefined
            },
            {
                id: 'create',
                route: `/create-form`,
                name: 'Create Form',
                icons: undefined
            },
            {
                id: 'forms',
                route: `/forms`,
                name: 'Forms',
                icons: undefined
            },
        ],
        [getIcon]
    );


    const defaultItems = React.useMemo(
        () =>
            getSidebarMenuItems.map((route) => ({
                ...route,
                icons: getIcon(route.id),
            })),
        [getIcon, getSidebarMenuItems]
    );

    return (
        <Sidebar
            key={pathname}
            items={defaultItems}
            onSideBarChange={onSideBarChange}
            profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCicxernIb5W2jIRbjKwiMOVIit_7XJtczA&s"
            userName="John Smith"
        />
    );
});

WithSideBar.displayName = 'WithSideBar';
