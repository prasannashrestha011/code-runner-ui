import CreateSandboxForm from '@/components/sandbox/create_form/CreateSandboxForm'

export default function CreateSandboxPage() {
    return (
        <div className="max-w-4xl mx-auto py-xl px-md space-y-xl relative font-sans">
            {/* Navigation / Breadcrumbs */}

            {/* Header */}
            <div className="flex flex-col gap-xs">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    New Execution Sandbox
                </h1>
                <p className="text-body-md text-on-surface-variant max-w-3xl ">
                    Spin up an isolated, resource-constrained container environment to execute commands and scripts securely.
                </p>
            </div>

            <CreateSandboxForm />
        </div>
    )
}
