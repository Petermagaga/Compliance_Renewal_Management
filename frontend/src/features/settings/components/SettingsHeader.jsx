function SettingsHeader() {
    return (
        <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
                Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Manage your account, workspace, and notification preferences.
            </p>
        </div>
    );
}

export default SettingsHeader;