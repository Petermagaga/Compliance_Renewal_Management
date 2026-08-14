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

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(null);


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
                    name: companyData.name || "",
                    email: companyData.email || "",
                    phone: companyData.phone || "",
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


    useEffect(() => {

        fetchCompany();

    }, []);


    const updateCompanyField = (field, value) => {

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
                await settingsService.updateCompany({
                    name: company.name,
                    email: company.email,
                    phone: company.phone,
                });

            console.log(
                "Company update response:",
                response
            );

            const updatedCompany =
                response?.data;

            if (updatedCompany) {

                setCompany({
                    name: updatedCompany.name || "",
                    email: updatedCompany.email || "",
                    phone: updatedCompany.phone || "",
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
                err?.response?.data?.message ||
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

    };


    return (

        <SettingsContext.Provider value={value}>

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