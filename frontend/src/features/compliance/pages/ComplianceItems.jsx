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

        await api.delete(

            `/compliance/items/${selectedItem.id}/`

        );

        fetchItems();

        closeDeleteModal();

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setDeleting(false);

    }

};

