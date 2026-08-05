import { useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import ComplianceHeader from "../components/ComplianceHeader";
import ExecutiveStats from "../components/ExecutiveStats";
import ComplianceToolbar from "../components/ComplianceToolbar";
import ComplianceTable from "../components/ComplianceTable";
import EmptyState from "../components/EmptyState";
import ComplianceDeleteModal from "../components/ComplianceDeleteModal";
 
import ComplianceSkeleton from "../components/ComplianceSkeleton";
import CompliancePagination from "../components/CompliancePagination";

import { useCompliance } from "../hooks/useCompliance";

function ComplianceItems() {

    const {
        filteredItems,
        loading,
        deleteItem,
        refresh,
        page,
        totalPages,
        setPage
    } = useCompliance();

    const [selectedItem, setSelectedItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedItem(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {

        if (!selectedItem) return;

        try {

            setDeleting(true);

            await deleteItem(selectedItem.id);

            closeDeleteModal();

            refresh();

        } catch (error) {

            console.error(error);

        } finally {

            setDeleting(false);

        }
    };

    return (

        <MainLayout>

            <div className="space-y-6 p-8">

                <ComplianceHeader />

                <ExecutiveStats
                    items={filteredItems}
                />

                <ComplianceToolbar />

                {loading ? (

                    <ComplianceSkeleton />

                ) : filteredItems.length === 0 ? (

                    <EmptyState />

                ) : (
                    <>
                        <ComplianceTable
                            items={filteredItems}
                            onDelete={openDeleteModal}
                        />
                        
                        <CompliancePagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        />

                    </>
                )}

                


            </div>

            <ComplianceDeleteModal
                open={showDeleteModal}
                item={selectedItem}
                loading={deleting}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />

        </MainLayout>

    );

}

export default ComplianceItems;