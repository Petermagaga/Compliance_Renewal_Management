import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import complianceService from "../services/complianceService";
import AuditTrailCard from "../components/ReminderHistoryCard";
import ReminderHistoryCard from "../components/ReminderHistoryCard";
import DetailHeader from "../components/DetailHeader";
import SummaryCard from "../components/SummaryCard";
import InformationCard from "../components/InformationCard";
import TimelineCard from "../components/TimelineCard";
import WorkflowCard from "../components/WorkfowCard";

function ComplianceDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);

    const [auditTrail, setAuditTrail] = useState([]);

    const [reminders, setReminders] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        if (id) {

            fetchItem();

        }

    }, [id]);

    const fetchItem = async () => {

        try {

            const [

                itemResponse,

                auditResponse,

                reminderResponse,

            ] = await Promise.all([

                complianceService.getItem(id),

                complianceService.getAuditTrail(id),

                complianceService.getReminderHistory(id),

            ]);

            setItem(itemResponse.data);

            setAuditTrail(auditResponse.data);

            setReminders(reminderResponse.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }


    const timeline = [
        ...auditTrail.map(event => ({
            id: `audit-${event.id}`,
            activity_type: event.activity_type,
            title: event.title,
            description: event.description,
            created_at: event.created_at,
            user_name: event.user_name || "System",
        })),

        ...reminders.map(reminder => ({
            id: `reminder-${reminder.id}`,
            activity_type:
                reminder.channel === "whatsapp"
                    ? "whatsapp_sent"
                    : "email_sent",

            title:
                reminder.status === "sent"
                    ? `${reminder.channel === "whatsapp" ? "WhatsApp" : "Email"} Reminder Sent`
                    : `${reminder.channel === "whatsapp" ? "WhatsApp" : "Email"} Reminder Failed`,

            description:
                `${reminder.compliance_item_name} reminder — ${reminder.days_before} day(s) before expiry.`,

            created_at: reminder.sent_at,

            user_name: "System",
        })),
    ].sort(
        (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
    );

    return (

        <div className="p-8 space-y-6">

            <DetailHeader item={item} />

            <SummaryCard item={item} />


            <div className="grid gap-6 lg:grid-cols-2">

                <InformationCard item={item} />

                <WorkflowCard item={item} />


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