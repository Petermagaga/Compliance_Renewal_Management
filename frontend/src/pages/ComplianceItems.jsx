import { useEffect, useState } from "react"; 
import api from "../services/api";

function ComplianceItems() { 
    const [items, setItems] = useState([]);
     useEffect(() => { fetchItems(); }, []);

     const fetchItems = () => {
         api.get("/compliance/items/") 
         .then((res) => setItems(res.data))
         .catch((err) => console.error(err)); };
          const deleteItem = async (id) => { 
            try { 
                await api.delete(`/compliance/items/${id}/`); 
                fetchItems(); 
            } catch (error) {
                 console.error(error); 
                } }; 
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
                                         <td>{item.status}</td> 
                                         <td>{item.priority}</td> 
                                         <td> 
                                            <button
                                              onClick={() => deleteItem(item.id)} 
                                              className="bg-red-500 text-white px-2 py-1 rounded" > 
                                              Delete </button> 
                                              </td> 
                                              </tr> 
                                        ))} 
                                    </tbody> 
                                </table> 
                                </div> 
                                );
                             }
                             
                             
                             export default ComplianceItems;