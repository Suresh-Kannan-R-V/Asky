'use client';

import React from 'react';
import {
    Dropdown as HeroDropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    cn,
} from '@heroui/react';

interface DropdownItemData {
    key: string;
    label: React.ReactNode;
    startContent?: React.ReactNode;
    className?: string;
}

interface DropdownProps {
    triggerLabel?: React.ReactNode;
    items: DropdownItemData[];
    onAction?: (key: string) => void;
    className?: string;
}

const Dropdown = React.memo(
    React.forwardRef((props: DropdownProps, ref: React.Ref<HTMLDivElement>) => {
        const {
            triggerLabel = 'Open Menu',
            items,
            onAction,
            className,
        } = props;
        return (
            <HeroDropdown className={cn("", className)} ref={ref}>
                <DropdownTrigger>
                    {triggerLabel}
                </DropdownTrigger>

                <DropdownMenu
                    onAction={(key) => onAction?.(String(key))}
                >
                    {items.map((item) => (
                        <DropdownItem
                            startContent={item.startContent}
                            key={item.key}
                            className={cn("font-semibold rounded-lg",
                                // hover
                                'data-[hover=true]:bg-primary-100/50',
                                // pressed (CLICK)
                                'data-[pressed=true]:bg-primary-400/50',
                                // focus (keyboard)
                                'data-[focus-visible=true]:bg-primary-100/50',
                                item.className
                            )}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </HeroDropdown>
        );
    }));

Dropdown.displayName = 'Dropdown';
export { Dropdown };
