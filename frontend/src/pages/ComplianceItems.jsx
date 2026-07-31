import { useEffect, useState } from "react"; 
import api from "../services/api";
import StatusBadge from "../features/compliance/components/badges/StatusBadge";
import PriorityBadge from "../features/compliance/components/badges/PriorityBadge";
import ComplianceDeleteModal from "../features/compliance/components/ComplianceDeleteModal";

function ComplianceItems() {

    // State
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Load items
    useEffect(() => {
        fetchItems();
    }, []);

    // Fetch items
    const fetchItems = () => {
        api.get("/compliance/items/")
            .then((res) => setItems(res.data))
            .catch((err) => console.error(err));
    };

    // Open modal
    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    // Close modal
    const closeDeleteModal = () => {
        setSelectedItem(null);
        setShowDeleteModal(false);
    };

    // Delete item
    const confirmDelete = async () => {
        if (!selectedItem) return;

        try {
            setDeleting(true);

            await api.delete(`/compliance/items/${selectedItem.id}/`);

            fetchItems();
            closeDeleteModal();
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (


                <div className="p-8"> 
                <h1 className="text-3xl font-bold mb-6">Compliance Items</h1> 
                
                <table className="w-full border"> 
                    <thead> 
                        <tr className="bg-gray-200">
                             <th>Name</th> 
                             <th>Category</th> 
                             <th>Expiry Date</th> 
                             <th>Status</th> 
                             <th>Priority</th> 
                             <th>Actions</th> 
                             </tr> 
                             </thead> 
                             
                             <tbody> 
                                {items.map((item) => (
                                     <tr key={item.id} className="text-center border-t">
                                         <td>{item.name}</td> 
                                         <td>{item.category}</td> 
                                         <td>{item.expiry_date}</td> 
                                         <td><StatusBadge status={item.status} /></td> 
                                         <td><PriorityBadge priority={item.priority} /></td> 
                                         <td> 
                                            <button
                                              onClick={() => openDeleteModal(item)} 
                                              className="bg-red-500 text-white px-2 py-1 rounded" > 
                                              Delete </button> 
                                              </td> 
                                              </tr> 
                                        ))} 
                                    </tbody> 
                                </table> 


                                <ComplianceDeleteModal

                                open={showDeleteModal}

                                item={selectedItem}

                                loading={deleting}

                                onClose={closeDeleteModal}

                                onConfirm={confirmDelete}

                            />
                                </div> 



    );
}

export default ComplianceItems;

