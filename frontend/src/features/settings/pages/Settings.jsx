import MainLayout from "../../../components/layout/MainLayout";

import SettingsHeader from "../components/SettingsHeader";
import OrganizationSettings from "../components/OrganizationSettings";
import SettingsSection from "../components/SettingsSection";

function Settings() {
    return (
        <MainLayout>

            <main className="min-h-screen bg-slate-50">

                <div
                    className="
                        mx-auto
                        max-w-5xl
                        px-6
                        py-8
                    "
                >

                    <SettingsHeader />

                    <div className="space-y-6">

                        <OrganizationSettings />

                        <SettingsSection
                            title="Notification Preferences"
                            description="Control how OpenComply communicates renewal events."
                        >
                            <div className="space-y-5">

                                <label className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            Email notifications
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Receive compliance renewal notifications by email.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4"
                                    />
                                </label>

                                <label className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            WhatsApp notifications
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Receive urgent renewal notifications through WhatsApp.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4"
                                    />
                                </label>

                            </div>
                        </SettingsSection>

                        <SettingsSection
                            title="Account"
                            description="Manage your OpenComply account."
                        >
                            <div className="space-y-4">

                                <button
                                    type="button"
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-200
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        hover:bg-slate-50
                                    "
                                >
                                    Change Password
                                </button>

                            </div>
                        </SettingsSection>

                        <div className="flex justify-end">

                            <button
                                type="button"
                                className="
                                    rounded-xl
                                    bg-green-600
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    transition
                                    hover:bg-green-700
                                "
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </MainLayout>
    );
}

export default Settings;