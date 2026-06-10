import Link from 'next/link'
import React from 'react'

const TopNavBar = () => {
    return (
        <header className="bg-blue-950 border-b  border-outline-variant flex justify-between items-center w-full px-lg h-16 sticky top-0 z-50">
            <div className="flex items-center gap-md">
                <span className="font-headline-md text-headline-md font-bold text-slate-50">DevSandbox</span>
                <nav className="hidden md:flex gap-lg ml-xl text-slate-200">
                    <Link className="font-body-md text-body-md  border-b-2 border-primary pb-1 transition-colors" href="/">Explorer</Link>
                </nav>
            </div>
            <div className="flex items-center gap-md">
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors p-2">help_outline</button>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden">
                    <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZqzQ_qMe9Nu0KKFIvWDI5GVgOw3jrQUHn_iaDuy8dq1ZE0pEkryInexCIUP_XGovmqVm3VYw_xBQOIsZKBDxmxNb3jX7D1Ps8IFZPIrvHxJgHRkbm9QkpTXEDtD32VbCw92V9HRRRGuiT_W-k62xLI46JLLof4azMEPMhnFbGOmvlipxhVS0ssHvcnd9UKJ7gDVewwplH20WQkLSwSdO-OKYIbsBGF1QwVou3T0c5rmWGLy2H1D8JGJlFw0z5x1OxU8RatD-aeW0m" />
                </div>
            </div>
        </header>
    )
}

export default TopNavBar