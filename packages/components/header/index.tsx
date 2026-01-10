/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { cn } from '@heroui/react';
import React from "react";
import { BreadCrumbs } from '../breadcrumbs';

interface HeaderProps {
    className?: string;
    headerTitle: string;
    Breadcrumbs?: React.JSX.Element;
    headerClass?: string;
}

const Header = React.memo(
    React.forwardRef((props: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
        const {
            className,
            headerTitle,
            Breadcrumbs,
            headerClass,
            ...rest
        } = props;

        return (
            <div className={cn('bg-white px-4 py-2 rounded-xl shadow-md flex gap-4', className)} ref={ref} {...rest}>
                <p className={cn('font-semibold text-base', headerClass)}>{headerTitle}</p>
                <div>
                    <BreadCrumbs />
                </div>
            </div>
        );
    }));

    Header.displayName = 'Header';
    export { Header };