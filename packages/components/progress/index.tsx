/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { Progress as HeroProgress, cn } from '@heroui/react';

interface ProgressProps {
    className?: string;
    label?: string;

    value: number;
    maxValue?: number;

    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

    /** Tailwind class: text-primary-500, text-success-600, etc */
    customColor?: string;

    showValueLabel?: boolean;
    formatOptions?: Intl.NumberFormatOptions;
    valueLabel?: React.ReactNode;

}

const Progress = React.memo(
    React.forwardRef<HTMLDivElement, ProgressProps>(
        (
            {
                className,
                label,
                value,
                maxValue = 100,
                size = 'sm',
                color = 'success',
                customColor,
                showValueLabel = false,
                formatOptions,
                valueLabel,
                ...rest
            },
            ref
        ) => {
            const isTailwindClass = customColor?.startsWith('text-');

            return (
                <div ref={ref} className={cn('w-full relative', className)}>
                    {valueLabel && (
                        <p className="mt-1 text-sm font-semibold text-primary-600 absolute right-0">
                            {valueLabel}
                        </p>
                    )}
                    <HeroProgress
                        label={label}
                        value={value}
                        maxValue={maxValue}
                        size={size}
                        color={customColor ? 'default' : color}
                        showValueLabel={showValueLabel}
                        formatOptions={formatOptions}
                        classNames={{
                            label: cn('font-medium text-gray-700'),
                            indicator: cn(
                                isTailwindClass && customColor?.replace('text-', 'bg-')
                            ),
                        }}
                        {...rest}
                    />
                </div>
            );
        }
    )
);

Progress.displayName = 'Progress';
export { Progress };
