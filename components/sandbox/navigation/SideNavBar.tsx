"use client"; // Required to track active route changes using hooks

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation' // Import the hook
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa6'

const SideNavBar = () => {
    const pathname = usePathname();

    // Shared style definitions to avoid long messy lines
    const linkBase = "flex items-center gap-md px-md py-2 rounded-lg border-l-4 transition-all duration-200";
    const activeStyle = "text-primary bg-primary-container/40 border-primary";
    const inactiveStyle = "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 border-transparent";

    return (
        <aside className="hidden md:flex font-sans flex-col py-lg bg-surface-container-low border-r border-outline-variant w-64 shrink-0 h-[calc(100vh-64px)] sticky top-16">
            <div className="px-lg mb-xl">
                <div className="flex items-center gap-md mb-2">
                    <div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container">layers</span>
                    </div>
                    <div>
                        <h3 className="text-primary uppercase">Sandbox V1</h3>
                        <p className="text-xs text-on-surface-variant">Production-Dev</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-sm py-md">
                {/* Navigation Section Group Wrapper */}
                <div className="flex flex-col gap-1">

                    {/* Category Header Section - Properly tracked, uppercase, and muted */}
                    <p className="px-md text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase mb-2">
                        Sandbox Engine
                    </p>

                    {/* Link 1: Sandboxes (Active when path is /sandbox) */}
                    <Link
                        className={`${linkBase} ${pathname === "/sandbox" ? activeStyle : inactiveStyle}`}
                        href="/sandbox"
                    >
                        <AiFillCodeSandboxCircle size={18} className="shrink-0" />
                        <span className="text-body-sm font-semibold tracking-wide">Sandboxes</span>
                    </Link>

                    {/* Link 2: Create Instance (Active when path is /sandbox/create) */}
                    <Link
                        className={`${linkBase} ${pathname === "/sandbox/create" ? activeStyle : inactiveStyle}`}
                        href="/sandbox/create"
                    >
                        <FaPlus size={14} className="shrink-0 pl-0.5" />
                        <span className="text-body-sm font-medium tracking-wide">Create Instance</span>
                    </Link>

                </div>
            </nav>
        </aside>
    )
}

export default SideNavBar;