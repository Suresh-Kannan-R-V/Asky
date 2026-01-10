'use client';

import React from 'react';
import { cn, Button as HeroButton } from '@heroui/react';
import type { PressEvent } from '@react-types/shared';

export interface ButtonProps {
    /** Content */
    children?: React.ReactNode;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;

    /** Style */
    variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

    /** State */
    fullWidth?: boolean;
    isIconOnly?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    disableRipple?: boolean;
    disableAnimation?: boolean;

    /** Loading */
    spinner?: React.ReactNode;
    spinnerPlacement?: 'start' | 'end';

    /** Events (ONLY needed ones) */
    onPress?: (e: PressEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;

    className?: string;
}

const Button = React.memo(
    React.forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
        const {
            children,
            startContent,
            endContent,
            variant = 'solid',
            color = 'default',
            size = 'md',
            radius = 'md',
            spinnerPlacement = 'start',
            className,
            ...rest
        } = props;

        return (
            <HeroButton
                ref={ref}
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                startContent={startContent}
                endContent={endContent}
                spinnerPlacement={spinnerPlacement}
                className={cn("bg-primary-400 shadow-md rounded-xl font-semibold border-none ",className)}
                {...rest}
            >
                {children}
            </HeroButton>
        );
    }));

    Button.displayName = 'Button';
    export { Button };

