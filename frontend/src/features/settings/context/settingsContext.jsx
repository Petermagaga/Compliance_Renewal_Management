import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import settingsService from "../services/settingsService";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [company, setCompany] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [
        notificationPreferences,
        setNotificationPreferences,
    ] = useState({
        email_enabled: true,
        whatsapp_enabled: true,
    });

    const [
        notificationLoading,
        setNotificationLoading,
    ] = useState(false);

    const [
        notificationError,
        setNotificationError,
    ] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState(null);

    const [success, setSuccess] =
        useState(null);

    const fetchCompany = async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await settingsService.getCompany();

            console.log(
                "Company settings API response:",
                response
            );

            const companyData =
                response?.data;

            if (companyData) {
                setCompany({
                    name:
                        companyData.name || "",
                    email:
                        companyData.email || "",
                    phone:
                        companyData.phone || "",
                });
            }
        } catch (err) {
            console.error(
                "Failed to load company settings:",
                err
            );

            setError(
                "Unable to load company information."
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchNotificationPreferences =
        async () => {
            try {
                setNotificationLoading(true);
                setNotificationError(null);

                const response =
                    await settingsService.getNotificationPreferences();

                console.log(
                    "Notification Preferences API response:",
                    response
                );

                const data =
                    response?.data?.data;

                if (data) {
                    setNotificationPreferences(
                        data
                    );
                }
            } catch (err) {
                console.error(
                    "Notification Preferences API failed:",
                    err
                );

                setNotificationError(err);
            } finally {
                setNotificationLoading(
                    false
                );
            }
        };

    const updateNotificationPreferences =
        async (data) => {
            try {
                setNotificationLoading(
                    true
                );

                setNotificationError(
                    null
                );

                const response =
                    await settingsService.updateNotificationPreferences(
                        data
                    );

                console.log(
                    "Notification Preferences update response:",
                    response
                );

                const updatedData =
                    response?.data?.data;

                if (updatedData) {
                    setNotificationPreferences(
                        updatedData
                    );
                }

                return response;
            } catch (err) {
                console.error(
                    "Notification Preferences update failed:",
                    err
                );

                setNotificationError(
                    err
                );

                throw err;
            } finally {
                setNotificationLoading(
                    false
                );
            }
        };

    useEffect(() => {
        fetchCompany();
        fetchNotificationPreferences();
    }, []);

    const updateCompanyField = (
        field,
        value
    ) => {
        setCompany((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const saveCompany = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            const response =
                await settingsService.updateCompany(
                    {
                        name:
                            company.name,
                        email:
                            company.email,
                        phone:
                            company.phone,
                    }
                );

            console.log(
                "Company update response:",
                response
            );

            const updatedCompany =
                response?.data;

            if (updatedCompany) {
                setCompany({
                    name:
                        updatedCompany.name ||
                        "",
                    email:
                        updatedCompany.email ||
                        "",
                    phone:
                        updatedCompany.phone ||
                        "",
                });
            }

            setSuccess(
                response?.message ||
                    "Company settings updated successfully."
            );
        } catch (err) {
            console.error(
                "Failed to update company settings:",
                err
            );

            setError(
                err?.response?.data
                    ?.message ||
                    "Unable to update company settings."
            );
        } finally {
            setSaving(false);
        }
    };

    const value = {
        company,
        loading,
        saving,
        error,
        success,
        updateCompanyField,
        saveCompany,
        fetchCompany,

        notificationPreferences,
        notificationLoading,
        notificationError,
        fetchNotificationPreferences,
        updateNotificationPreferences,
    };

    return (
        <SettingsContext.Provider
            value={value}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context =
        useContext(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettings must be used within SettingsProvider"
        );
    }

    return context;
}