'use client';
import { HeroUIProvider } from '@heroui/react'
import { PropsWithChildren } from 'react'

export default function Provider({ children }: PropsWithChildren) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}
