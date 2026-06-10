import FooterNav from "@/components/sandbox/navigation/FooterNav";
import SideNavBar from "@/components/sandbox/navigation/SideNavBar";
import TopNavBar from "@/components/sandbox/navigation/TopNavBar";
import Link from "next/link";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function SandboxLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        /* Replace html/body with a clean structural container div */
        <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">

            {/* TopNavBar Implementation */}

            <TopNavBar />
            <div className="flex flex-1 font-mono font-semibold text-sm">
                <SideNavBar />
                <main className="flex-1 custom-scrollbar overflow-y-auto p-md md:p-xl lg:p-2xl">
                    {children}
                </main>
            </div>

            <FooterNav />
        </div>
    );
}