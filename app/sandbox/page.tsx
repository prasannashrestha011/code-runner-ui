import SandboxList from '@/components/sandbox/list/SandboxList'
import React from 'react'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

export default function SandboxPage() {
    return (
        <div>
            <nav className="flex justify-end">
                <Link href="/sandbox/create" className="inline-flex items-center gap-1 text-sm font-mono text-violet-50 bg-violet-600 border border-violet-200 px-2.5 py-1 rounded-full mb-5">
                    <span><FaPlus /></span>
                    Create Sandbox
                </Link>
            </nav>
            <SandboxList />
        </div>
    )
}