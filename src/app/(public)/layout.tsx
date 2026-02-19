export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen items-center justify-center overflow-hidden bg-primary-50">
                <div className="bg-white rounded-2xl min-h-80 w-fit shadow-lg flex justify-center p-6">
                    {children}
                </div>
        </div>
    );
}
