/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { cn } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { LogoIcon } from 'packages/icons';
import React from 'react';
import { Button } from '../button';
import { LogOut } from 'lucide-react';

interface Route {
  id: string;
  route: string;
  name: string;
  icons: React.JSX.Element;
}

export interface SidebarProps {
  className?: string;
  items: Route[];
  profileImage?: string;
  userName?: string;
  onSideBarChange: (data: Route) => void;
}


const Sidebar = React.memo(
  React.forwardRef((props: SidebarProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      items,
      profileImage = '',
      userName = '',
      onSideBarChange = () => undefined,
      ...rest
    } = props;

    const pathname = usePathname();

    const isActive = (route: string, id: string) => {
      if (id === 'dashboard') {
        return pathname === '/ua';
      }
      return pathname.includes(route);
    };


    // dummy token clear
    const logout = () => {
      document.cookie = 'token=; Max-Age=0; path=/';
      document.cookie = 'role=; Max-Age=0; path=/';
      window.location.href = '/login';
    };


    return (
      <div className="relative h-screen w-16" ref={ref}>
        <div
          className={cn(
            'group fixed inset-y-0 left-0 z-[1000] flex h-screen flex-col justify-between grow',
            'border-r-2 bg-primary-50 py-3 pt-1.5 shadow-xl border-primary-500',
            'transition-all duration-300 ease-in-out',
            // COLLAPSED → EXPAND ON HOVER
            'w-14 hover:w-48 hover:pr-2',
            className
          )}
          ref={ref}
          {...rest}
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center px-3 mx-1 relative h-6">
              {/* <Bot className="cursor-pointer rounded-full border border-primary-700" /> */}
              <LogoIcon className='text-primary-600 size-9 absolute top-0 left-1.5 group-hover:left-12' />
              <div className="ml-[4.3rem] pt-6 hidden group-hover:block">
                <p className='font-kalam text-4xl text-primary-600'>sky</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-1 px-1.5">
              {items?.map((route) => (
                <div
                  key={route.id}
                  onClick={() => onSideBarChange(route)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 px-3 py-2 rounded-full text-primary-900',
                    'transition-all hover:bg-gray/10',
                    'justify-center group-hover:justify-start text-sm',
                    isActive(route.route, route.id) &&
                    'bg-primary-400/40 shadow-md text-base'
                  )}
                >
                  <div className="text-sm">{route.icons}</div>
                  <span className="hidden whitespace-nowrap text-b font-medium group-hover:block">
                    {route.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="border-t py-3">
            <div className="flex justify-center group-hover:justify-start px-3">
              <Button isIconOnly onPress={logout}><LogOut /></Button>
            </div>
          </div>
        </div>

      </div>

    );
  })
);

Sidebar.displayName = 'Sidebar';
export { Sidebar };
