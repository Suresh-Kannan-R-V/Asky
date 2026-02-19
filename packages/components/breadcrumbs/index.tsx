'use client';

import { formatLabel } from "@/context/helper";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface BreadcrumbsProps {}

const isHashedId = (segment: string) => {
    // numbers (123)
    if (/^\d+$/.test(segment)) return true;

    // UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    if (
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)
    ) {
        return true;
    }

    // long hash strings (16+ chars, mixed)
    if (/^[a-zA-Z0-9_-]{16,}$/.test(segment)) return true;

    return false;
};

const BreadCrumbs = React.memo((props: BreadcrumbsProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const segments = pathname
        .split('/')
        .filter(Boolean)
        .filter(segment => segment !== 'ua')
        .filter(segment => !isHashedId(segment)); // ✅ FIXED

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
