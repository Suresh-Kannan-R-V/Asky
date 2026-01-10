import { WithSideBar } from "@/context/withSidebar";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex w-full'>
            {/* side bar component */}
            <WithSideBar />
            <div className="px-5 py-5 w-full">

                {children}
            </div>
            {/* Screen section */}
        </div>
    );
}
