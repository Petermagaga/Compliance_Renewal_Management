import { createContext, useContext, useState } from "react";

const ComplianceFilterContext = createContext();

export function ComplianceFilterProvider({ children }) {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [category, setCategory] = useState("");

    const [priority, setPriority] = useState("");

    const [department, setDepartment] = useState("");

    const clearFilters = () => {

        setSearch("");

        setStatus("");

        setCategory("");

        setPriority("");

        setDepartment("");

    };

    return (

        <ComplianceFilterContext.Provider

            value={{

                search,
                status,
                category,
                priority,
                department,

                setSearch,
                setStatus,
                setCategory,
                setPriority,
                setDepartment,

                clearFilters,

            }}

        >

            {children}

        </ComplianceFilterContext.Provider>

    );

}

export function useComplianceFilters() {

    const context = useContext(ComplianceFilterContext);

    if (!context) {

        throw new Error(
            "useComplianceFilters must be used inside ComplianceFilterProvider"
        );

    }

    return context;

}