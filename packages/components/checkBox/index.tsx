/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { Checkbox as HeroCheckBox, cn } from '@heroui/react';

export interface CheckboxProps {
    className?: string;

    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

    /** State */
    checked: boolean;

    /** Label (fallback) */
    label?: string;

    /** Allow children */
    children?: React.ReactNode;

    /** Disabled */
    isDisabled?: boolean;

    icon?: React.ReactNode;

    /** Event */
    onChange: (value: boolean) => void;
}

const Checkbox = React.memo(
    React.forwardRef<HTMLDivElement, CheckboxProps>(
        (
            {
                className,
                checked,
                label = 'Required',
                children,
                isDisabled = false,
                radius = 'md',
                icon,
                onChange,
                ...rest
            },
            ref
        ) => {

            return (
                <div ref={ref} className={cn('flex items-center', className)}>
                    <HeroCheckBox
                        isSelected={checked}
                        isDisabled={isDisabled}
                        icon={icon}
                        radius={radius}
                        onValueChange={(value) => onChange(value)}
                        {...rest}
                    >
                        {children ?? label}
                    </HeroCheckBox>
                </div>
            );
        }
    )
);

Checkbox.displayName = 'Checkbox';
export { Checkbox };
