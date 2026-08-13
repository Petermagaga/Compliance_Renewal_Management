import SettingsSection from "./SettingsSection";

function OrganizationSettings() {
    return (
        <SettingsSection
            title="Organization"
            description="Manage your company information."
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Company Name
                    </label>

                    <input
                        type="text"
                        placeholder="Company name"
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            text-sm
                            outline-none
                            focus:border-green-500
                            focus:ring-2
                            focus:ring-green-100
                        "
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Company Email
                    </label>

                    <input
                        type="email"
                        placeholder="company@example.com"
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            text-sm
                            outline-none
                            focus:border-green-500
                            focus:ring-2
                            focus:ring-green-100
                        "
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Company Phone
                    </label>

                    <input
                        type="text"
                        placeholder="+254..."
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            text-sm
                            outline-none
                            focus:border-green-500
                            focus:ring-2
                            focus:ring-green-100
                        "
                    />
                </div>

            </div>
        </SettingsSection>
    );
}

export default OrganizationSettings;