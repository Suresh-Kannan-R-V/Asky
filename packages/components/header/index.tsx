/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { cn } from '@heroui/react';
import React from "react";
import { BreadCrumbs } from '../breadcrumbs';

interface HeaderProps {
    className?: string;
    headerTitle: string | React.ReactNode;
    endContent?: string | React.ReactNode;
    Breadcrumbs?: React.ReactNode;
    headerClass?: string;
}

const Header = React.memo(
    React.forwardRef((props: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
        const {
            className,
            headerTitle,
            endContent,
            Breadcrumbs,
            headerClass,
            ...rest
        } = props;

        return (
            <div className={cn('bg-white px-4 py-2 rounded-xl shadow-md flex gap-4', className)} ref={ref} {...rest}>
                <div className={cn("flex gap-4", headerClass)}>
                    <p className={cn('font-semibold text-base')}>{headerTitle}</p>
                    <div>
                        <BreadCrumbs />
                    </div>
                </div>
                <div>{endContent}</div>
            </div>
        );
    }));

Header.displayName = 'Header';
export { Header };