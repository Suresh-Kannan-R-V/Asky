/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { formatLabel } from "@/context/helper";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface BreadcrumbsProps {
    //Types for props
}

const BreadCrumbs = React.memo((props: BreadcrumbsProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const segments = pathname
        .split('/')
        .filter(Boolean)
        .filter((segment) => segment !== 'ua');

    const breadcrumbs = segments.map((segment, index) => ({
        label: formatLabel(segment),
        href: '/' + segments.slice(0, index + 1).join('/'),
    }));


    return (
        <div className="flex items-center gap-1">
            <span className="text-primary-600 font-semibold">/</span>
            <Breadcrumbs separator=">" className="mb-0">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <BreadcrumbItem
                            key={crumb.href}
                            className={!isLast ? 'cursor-pointer' : 'font-semibold'}
                            onClick={() => !isLast && router.push(crumb.href)}
                        >
                            {crumb.label}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
});

BreadCrumbs.displayName = 'Breadcrumb';
export { BreadCrumbs };