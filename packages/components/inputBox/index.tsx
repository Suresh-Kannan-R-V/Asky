'use client';

import React from 'react';
import { cn, Input as HeroInput } from '@heroui/react';

export interface InputProps {
    /** Value */
    value?: string;
    defaultValue?: string;

    /** Text */
    label?: React.ReactNode;
    placeholder?: string;
    description?: React.ReactNode;
    errorMessage?: React.ReactNode;

    /** Type */
    type?: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file';

    /** UI */
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    labelPlacement?: 'inside' | 'outside' | 'outside-left';

    /** Icons */
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;

    /** State */
    fullWidth?: boolean;
    isClearable?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    disableAnimation?: boolean;

    /** Validation */
    minLength?: number;
    maxLength?: number;
    pattern?: string;

    /** Events (ONLY needed ones) */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
    onClear?: () => void;

    /** Styling */
    className?: string;
    classNames?: Partial<
        Record<
            | 'base'
            | 'label'
            | 'inputWrapper'
            | 'innerWrapper'
            | 'mainWrapper'
            | 'input'
            | 'clearButton'
            | 'helperWrapper'
            | 'description'
            | 'errorMessage',
            string
        >
    >;
}

const Input = React.memo(
    React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
        const {
            label,
            variant = 'flat',
            color = 'default',
            size = 'md',
            radius = 'md',
            labelPlacement = 'inside' as const,
            fullWidth = true,
            className,
            classNames,
            ...rest
        } = props;

        return (
            <HeroInput
                ref={ref}
                label={label}
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                labelPlacement={label ? labelPlacement : 'outside'}
                fullWidth={fullWidth}
                className={cn("", className)}
                classNames={{
                    inputWrapper: cn(
                        `bg-white
                        data-[hover=true]:bg-white
                        data-[pressed=true]:bg-white
                        data-[focus-visible=true]:bg-white
                        group-data-[focus=true]:bg-white`,
                        'shadow-md rounded-xl',
                        classNames?.inputWrapper
                    ),

                    /** Inner + input text */
                    innerWrapper: 'bg-white',
                    input: cn('text-black bg-white', classNames?.input),

                    /** Cleanup */
                    base: 'bg-transparent',
                    mainWrapper: 'bg-transparent',
                    ...classNames,
                }}
                {...rest}
            />
        );
    }));

Input.displayName = 'Input';

export { Input };
