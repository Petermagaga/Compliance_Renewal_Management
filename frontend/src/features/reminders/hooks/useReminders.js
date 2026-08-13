import {
    useCallback,
    useEffect,
    useState,
} from "react";

import reminderService
    from "../services/reminderService";


function useReminders() {

    const [reminders, setReminders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    const fetchReminders = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const response =
                await reminderService.getReminders();

            console.log(
                "Reminders API response:",
                response
            );

            const reminderData =
                response?.data;

            if (Array.isArray(reminderData)) {

                setReminders(reminderData);

            } else {

                setReminders(
                    reminderData?.results || []
                );

            }

        } catch (err) {

            console.error(
                "Reminders API failed:",
                err
            );

            setError(err);

            setReminders([]);

        } finally {

            setLoading(false);

        }

    }, []);


    useEffect(() => {

        fetchReminders();

    }, [fetchReminders]);


    return {

        reminders,

        loading,

        error,

        refresh: fetchReminders,

    };

}


export default useReminders;