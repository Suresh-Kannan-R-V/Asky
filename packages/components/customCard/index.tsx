
'use client';

import { Card, CardBody, cn } from "@heroui/react";
import React from "react";

interface CustomCardProps {
    children?: React.ReactNode;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isHoverable?: boolean;
    isPressable?: boolean;
    isBlurred?: boolean;
    isFooterBlurred?: boolean;
    isDisabled?: boolean;
    className?: string;
}
const CustomCard = React.memo(
    React.forwardRef((props: CustomCardProps, ref: React.Ref<HTMLDivElement>) => {
        const { children, shadow,
            radius,
            fullWidth,
            isHoverable,
            isPressable,
            isBlurred,
            isFooterBlurred,
            isDisabled, className, ...rest
        } = props;

        return (
            <Card
                shadow={shadow}
                radius={radius}
                fullWidth={fullWidth}
                isHoverable={isHoverable}
                isPressable={isPressable}
                isBlurred={isBlurred}
                isFooterBlurred={isFooterBlurred}
                isDisabled={isDisabled}
                className={cn("border-t-5 border-primary-400 rounded-xl px-2 h-fit", className)}
                ref={ref}
                {...rest}>
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        );
    }));

CustomCard.displayName = 'CustomCard';
export { CustomCard };
