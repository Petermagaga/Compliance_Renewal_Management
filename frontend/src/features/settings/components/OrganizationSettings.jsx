import { useEffect, useState } from "react";

import SettingsSection from "./SettingsSection";

import settingsService from "../services/settingsService";


function OrganizationSettings() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        const loadCompany = async () => {

            try {

                setLoading(true);
                setError(null);

                const response =
                    await settingsService.getCompany();

                console.log(
                    "Company settings:",
                    response
                );

                const company =
                    response?.data;

                if (company) {

                    setForm({
                        name: company.name || "",
                        email: company.email || "",
                        phone: company.phone || "",
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

        loadCompany();

    }, []);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    if (loading) {

        return (

            <SettingsSection
                title="Organization"
                description="Manage your company information."
            >

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {[1, 2, 3].map((item) => (

                        <div
                            key={item}
                            className="animate-pulse"
                        >

                            <div className="mb-2 h-4 w-28 rounded bg-slate-200" />

                            <div className="h-12 w-full rounded-xl bg-slate-100" />

                        </div>

                    ))}

                </div>

            </SettingsSection>

        );

    }


    if (error) {

        return (

            <SettingsSection
                title="Organization"
                description="Manage your company information."
            >

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

            </SettingsSection>

        );

    }


    return (

        <SettingsSection
            title="Organization"
            description="Manage your company information."
        >

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Company Name */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
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


                {/* Company Email */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Company Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
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


                {/* Company Phone */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Company Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
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