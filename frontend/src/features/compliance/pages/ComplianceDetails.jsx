import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import complianceService from "../services/complianceService";

import AuditTrailCard from "../components/AuditTrailCard";
import ReminderHistoryCard from "../components/ReminderHistoryCard";
import DetailHeader from "../components/DetailHeader";
import SummaryCard from "../components/SummaryCard";
import InformationCard from "../components/InformationCard";
import TimelineCard from "../components/TimelineCard";
import WorkflowCard from "../components/WorkfowCard";

import DashboardErrorState from "../../dashboard/components/DashboardErrorState";

function ComplianceDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [auditTrail, setAuditTrail] = useState([]);
    const [reminders, setReminders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchItem = async () => {

        setLoading(true);
        setError(null);

        try {

            const itemResponse =
                await complianceService.getItem(id);

            setItem(itemResponse.data);


            // These are supporting sections.
            // If one fails, don't destroy the whole page.

            try {

                const auditResponse =
                    await complianceService.getAuditTrail(id);

                setAuditTrail(
                    auditResponse.data ?? []
                );

            } catch (auditError) {

                console.error(
                    "Audit trail loading failed:",
                    auditError
                );

                setAuditTrail([]);

            }


            try {

                const reminderResponse =
                    await complianceService.getReminderHistory(id);

                setReminders(
                    reminderResponse.data ?? []
                );

            } catch (reminderError) {

                console.error(
                    "Reminder history loading failed:",
                    reminderError
                );

                setReminders([]);

            }

        } catch (error) {

            console.error(
                "Compliance item loading failed:",
                error
            );

            setError(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (id) {
            fetchItem();
        }

    }, [id]);


    // ---------------------------------------
    // Loading
    // ---------------------------------------

    if (loading) {

        return (

            <div className="p-8">

                <div className="space-y-6">

                    <div className="h-24 animate-pulse rounded-2xl bg-white" />

                    <div className="h-32 animate-pulse rounded-2xl bg-white" />

                    <div className="grid gap-6 lg:grid-cols-2">

                        <div className="h-64 animate-pulse rounded-2xl bg-white" />

                        <div className="h-64 animate-pulse rounded-2xl bg-white" />

                    </div>

                </div>

            </div>

        );

    }


    // ---------------------------------------
    // Error
    // ---------------------------------------

    if (error) {

        return (

            <div className="p-8">

                <DashboardErrorState
                    title="Unable to load compliance item"
                    message="We couldn't retrieve this compliance item's information."
                    onRetry={fetchItem}
                />

            </div>

        );

    }


    // ---------------------------------------
    // Not found / empty
    // ---------------------------------------

    if (!item) {

        return (

            <div className="p-8">

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        text-center
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                    >
                        Compliance item not found
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        This compliance item may have been removed
                        or you may not have permission to view it.
                    </p>

                </div>

            </div>

        );

    }


    // ---------------------------------------
    // Timeline
    // ---------------------------------------

    const timeline = [

        ...auditTrail.map(event => ({

            id: `audit-${event.id}`,

            activity_type:
                event.activity_type,

            title:
                event.title,

            description:
                event.description,

            created_at:
                event.created_at,

            user_name:
                event.user_name || "System",

        })),

        ...reminders.map(reminder => ({

            id:
                `reminder-${reminder.id}`,

            activity_type:
                reminder.channel === "whatsapp"
                    ? "whatsapp_sent"
                    : "email_sent",

            title:
                reminder.status === "sent"
                    ? `${
                        reminder.channel === "whatsapp"
                            ? "WhatsApp"
                            : "Email"
                    } Reminder Sent`
                    : `${
                        reminder.channel === "whatsapp"
                            ? "WhatsApp"
                            : "Email"
                    } Reminder Failed`,

            description:
                `${reminder.compliance_item_name} reminder — ${reminder.days_before} day(s) before expiry.`,

            created_at:
                reminder.sent_at,

            user_name:
                "System",

        })),

    ].sort(
        (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
    );


    // ---------------------------------------
    // Success
    // ---------------------------------------

    return (

        <div className="space-y-6 p-8">

            <DetailHeader
                item={item}
            />

            <SummaryCard
                item={item}
            />


            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                <InformationCard
                    item={item}
                />

                <WorkflowCard
                    item={item}
                />

            </div>


            <ReminderHistoryCard
                reminders={reminders}
            />


            <AuditTrailCard
                events={auditTrail}
            />


            <TimelineCard
                timeline={timeline}
            />

        </div>

    );

}

export default ComplianceDetails;