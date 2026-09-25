import { useEffect, useRef,useState } from "react";
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


    const previousFilters = useRef({
    search,
    status,
    priority,
    department,
    });


    useEffect(() => {
        const filtersChanged =
            previousFilters.current.search !== search ||
            previousFilters.current.status !== status ||
            previousFilters.current.priority !== priority ||
            previousFilters.current.department !== department;

        if (filtersChanged && page !== 1) {
            previousFilters.current = {
                search,
                status,
                priority,
                department,
            };

            setPage(1);
            return;
        }

        previousFilters.current = {
            search,
            status,
            priority,
            department,
        };

        fetchItems();
    }, [page, search, status, priority, department]);


    const filteredItems = items.filter((item) => {
        const matchesCategory =
            !category || item.category === category;

        return matchesCategory;
    });
    



    const fetchItems = async () => {

        try {


            const response = await complianceService.getItems(page,
                search,
                status,
                priority,
                department
                
        );

           

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

    }, [page, search,status,priority,department]);

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