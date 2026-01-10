import { Metadata } from "next";
import { DashBoard } from "./(dashBoard)/page";
export const metadata: Metadata = {
    title: 'Dashboard | Asky',
    description:
        'Dashboard page for Asky',
};
export default function Page() {
    return (
        <DashBoard />
    );
}
