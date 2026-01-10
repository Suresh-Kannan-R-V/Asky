/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { Select as HeroSelect, SelectItem, cn } from '@heroui/react';

interface SelectProps {
    className?: string;

    /** Label */
    label?: string;
    labelPlacement?: 'inside' | 'outside' | 'outside-left';
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined';

    /** Data */
    items: { key: string; label: string }[];

    /** Value */
    selectedKeys?: Iterable<string>;

    /** UI */
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    disableSelectorIconRotation?: boolean;

    /** Custom Icon */
    selectorIcon?: React.ReactNode;

    /** Events */
    onChange?: (value: string) => void;
}

const Select = React.memo(
    React.forwardRef<HTMLDivElement, SelectProps>(
        (
            {
                className,
                label,
                labelPlacement = 'outside',
                items,
                variant = 'flat',
                placeholder,
                isRequired = false,
                isDisabled = false,
                disableSelectorIconRotation = false,
                selectorIcon,
                selectedKeys,
                onChange,
                ...rest
            },
            ref
        ) => {
            return (
                <div ref={ref} className={cn('w-full', className)}>
                    <HeroSelect
                        label={label}
                        labelPlacement={labelPlacement}
                        variant={variant}
                        isRequired={isRequired}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        selectedKeys={selectedKeys}
                        disableSelectorIconRotation={disableSelectorIconRotation}
                        selectorIcon={selectorIcon}
                        onChange={(e) => onChange?.(e.target.value)}
                        className={cn("font-semibold rounded-lg shadow-md",
                            // hover
                            'data-[hover=true]:bg-primary-100/50',
                            // pressed (CLICK)
                            'data-[pressed=true]:bg-primary-400/50',
                            // focus (keyboard)
                            'data-[focus-visible=true]:bg-primary-100/50',
                        )}
                        classNames={{
                            trigger: `bg-white
                                data-[hover=true]:bg-white
                                data-[pressed=true]:bg-white
                                data-[focus-visible=true]:bg-white`,
                            value: 'bg-white',
                            innerWrapper: 'bg-white',
                        }}
                        {...rest}
                    >
                        {items.map((item) => (
                            <SelectItem key={item.key} className={cn("font-semibold rounded-lg",
                                'data-[hover=true]:bg-primary-100/50',
                                // pressed (CLICK)
                                'data-[pressed=true]:bg-primary-400/50',
                                // focus (keyboard)
                                'data-[focus-visible=true]:bg-primary-100/50',
                            )}>{item.label}</SelectItem>
                        ))}
                    </HeroSelect>
                </div >
            );
        }
    )
);

Select.displayName = 'Select';
export { Select };
