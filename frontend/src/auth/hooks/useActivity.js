import { useCallback, useEffect, useState } from "react";

import activityService from "../../services/activityService";
export default function useActivity() {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadActivities = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const response =
                await activityService.getRecent();

            const payload = response.data?.data;

            setActivities(
                Array.isArray(payload)
                    ? payload
                    : payload?.results || []
            );

        } catch (err) {

            console.error(
                "Failed to load activity:",
                err
            );

            setError(err);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadActivities();

    }, [loadActivities]);

    return {
        activities,
        loading,
        error,
        refresh: loadActivities,
    };
}