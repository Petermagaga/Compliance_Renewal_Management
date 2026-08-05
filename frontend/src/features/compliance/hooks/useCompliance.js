import { useEffect, useState } from "react";
import complianceService from "../services/complianceService";
import { useComplianceFilters } from "../context/ComplianceFilterContext";
export function useCompliance() {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const PAGE_SIZE = 10;

    const [loading, setLoading] = useState(true);


    const {

        search,

        status,

        priority,

        category,

        department,

    } = useComplianceFilters();


    const filteredItems = items.filter(item => {

        const matchesSearch =

            (item.name ?? "")

                .toLowerCase()

                .includes(search.toLowerCase())

            ||

            (item.responsible_person

                ?? "") .toLowerCase()

                .includes(search.toLowerCase())

            ||

            (item.department

                ?? "") .toLowerCase()

                .includes(search.toLowerCase());

        const matchesStatus =

            !status ||

            item.status === status;

        const matchesPriority =

            !priority ||

            item.priority === priority;

        const matchesCategory =

            !category ||

            item.category === category;

        const matchesDepartment =

            !department ||

            item.department === department;

        return (

            matchesSearch &&

            matchesStatus &&

            matchesPriority &&

            matchesCategory &&

            matchesDepartment

        );

    });




    const fetchItems = async () => {

        try {


            const response = await complianceService.getItems(page);

            console.log("Compliance API:", response.data);

            setItems(response.data.results ?? []);
            setCount(response.data.count ?? 0);

        }catch (error) {
            console.error("Failed to fetch compliance items:", error);

        }finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchItems();

    }, [page]);

    const deleteItem = async (id) => {

        await complianceService.deleteItem(id);

        fetchItems();

    };

    const totalPages = Math.ceil(
        count / PAGE_SIZE
    );

    return {

        filteredItems,

        loading,

        items,

        deleteItem,

        refresh: fetchItems,
        page,
        totalPages,
        setPage,

    };

}