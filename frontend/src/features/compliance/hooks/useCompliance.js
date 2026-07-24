import { useEffect, useState } from "react";
import complianceService from "../services/complianceService";

export function useCompliance() {

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {

        try {

            const response = await complianceService.getItems();

            setItems(response.data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchItems();

    }, []);

    const deleteItem = async (id) => {

        await complianceService.deleteItem(id);

        fetchItems();

    };

    return {

        items,

        loading,

        deleteItem,

        refresh: fetchItems,

    };

}