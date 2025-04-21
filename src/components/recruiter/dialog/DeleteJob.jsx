import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

const DeleteJob = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteHandler = () => {
    // Placeholder for actual delete functionality
    alert("Item deleted!");
    setIsOpen(false);
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="w-full">
      <button 
        onClick={openDialog} 
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
      >
        <Trash2 size={18} />
        <span>Delete</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={20} />
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </div>
              <button onClick={closeDialog} className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Are you sure you want to delete this job?</p>
                  <p className="text-sm text-gray-600">This will permanently remove all associated data.</p>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                <p className="text-amber-800 text-sm flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>This action cannot be undone.</span>
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 p-4 bg-gray-50 border-t">
              <button 
                onClick={closeDialog}
                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={deleteHandler}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteJob