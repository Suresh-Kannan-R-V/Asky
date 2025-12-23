'use client';
import { HeroUIProvider } from '@heroui/react'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes';


export default function Provider({ children }: PropsWithChildren) {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    )
}
