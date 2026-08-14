import { useEffect, useState } from "react";

import SettingsSection from "./SettingsSection";

import { useSettings } from "../context/settingsContext";


function OrganizationSettings() {

    const {
        company,
        loading,
        updateCompanyField,
    } = useSettings();


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
                        value={company.name}
                        onChange={(event) =>
                            updateCompanyField(
                                "name",
                                event.target.value
                            )
                        }
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
                        value={company.email}
                        onChange={(event) =>
                            updateCompanyField(
                                "email",
                                event.target.value
                            )
                        }
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
                        value={company.phone}
                        onChange={(event) =>
                            updateCompanyField(
                                "phone",
                                event.target.value
                            )
                        }
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