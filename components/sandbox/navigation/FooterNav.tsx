import Link from 'next/link'

const FooterNav = () => {
    return (
        <footer className="bg-background border-t border-outline-variant flex justify-between items-center px-lg py-md w-full mt-auto">
            <div className="flex items-center gap-md">
                <span className="font-body-sm text-body-sm text-on-surface-variant">© 2024 DevSandbox Engine</span>
            </div>
            <nav className="flex gap-lg">
                <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</Link>
                <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API Reference</Link>
                <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Status</Link>
            </nav>
        </footer>
    )
}

export default FooterNav