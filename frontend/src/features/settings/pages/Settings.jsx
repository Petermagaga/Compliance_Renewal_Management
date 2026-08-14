import MainLayout from "../../../components/layout/MainLayout";
import SettingsHeader from "../components/SettingsHeader";
import OrganizationSettings from "../components/OrganizationSettings";
import SettingsSection from "../components/SettingsSection";
import { useEffect, useState } from "react";

import {
    SettingsProvider,
    useSettings,
} from "../context/settingsContext";

function SettingsContent() {
    const {
        saving,
        error,
        success,
        saveCompany,
        notificationPreferences,
        updateNotificationPreferences,
        notificationLoading,
    } = useSettings();

    const [emailEnabled, setEmailEnabled] =
        useState(true);

    const [
        whatsappEnabled,
        setWhatsappEnabled,
    ] = useState(true);

    useEffect(() => {
        setEmailEnabled(
            notificationPreferences.email_enabled
        );

        setWhatsappEnabled(
            notificationPreferences.whatsapp_enabled
        );
    }, [notificationPreferences]);

    const handleSave = async () => {
        try {
            await updateNotificationPreferences({
                email_enabled:
                    emailEnabled,

                whatsapp_enabled:
                    whatsappEnabled,
            });

            await saveCompany();
        } catch (err) {
            console.error(
                "Failed to save settings:",
                err
            );
        }
    };

    return (
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
                    {/* Organization */}

                    <OrganizationSettings />

                    {/* Notification Preferences */}

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
                                        Receive compliance
                                        renewal
                                        notifications by
                                        email.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={
                                        emailEnabled
                                    }
                                    onChange={(e) =>
                                        setEmailEnabled(
                                            e.target
                                                .checked
                                        )
                                    }
                                    disabled={
                                        notificationLoading
                                    }
                                    className="h-4 w-4"
                                />
                            </label>

                            <label className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        WhatsApp
                                        notifications
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Receive urgent
                                        renewal
                                        notifications
                                        through
                                        WhatsApp.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={
                                        whatsappEnabled
                                    }
                                    onChange={(e) =>
                                        setWhatsappEnabled(
                                            e.target
                                                .checked
                                        )
                                    }
                                    disabled={
                                        notificationLoading
                                    }
                                    className="h-4 w-4"
                                />
                            </label>
                        </div>
                    </SettingsSection>

                    {/* Account */}

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

                    {/* Messages */}

                    {error && (
                        <div
                            className="
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-600
                            "
                        >
                            {error}
                        </div>
                    )}

                    {success && (
                        <div
                            className="
                                rounded-xl
                                border
                                border-green-200
                                bg-green-50
                                px-4
                                py-3
                                text-sm
                                text-green-700
                            "
                        >
                            {success}
                        </div>
                    )}

                    {/* Save */}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={
                                handleSave
                            }
                            disabled={
                                saving ||
                                notificationLoading
                            }
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
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {saving ||
                            notificationLoading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Settings() {
    return (
        <MainLayout>
            <SettingsProvider>
                <SettingsContent />
            </SettingsProvider>
        </MainLayout>
    );
}

export default Settings;