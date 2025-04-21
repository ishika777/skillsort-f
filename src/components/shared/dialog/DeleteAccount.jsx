import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertCircle, Trash2, Info, AlertTriangle } from 'lucide-react';

const DeleteAccount = ({ deleteHandler }) => {
  const [confirmText, setConfirmText] = useState('');
  const [showError, setShowError] = useState(false);
  const [confirmStep, setConfirmStep] = useState(1);
  const [open, setOpen] = useState(false);
  
  const expectedText = "DELETE";
  const isConfirmTextValid = confirmText === expectedText;
  
  const handleDelete = () => {
    if (confirmStep === 1) {
      setConfirmStep(2);
      return;
    }
    
    if (!isConfirmTextValid) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    deleteHandler();
    setOpen(false);
    resetState();
  };
  
  const resetState = () => {
    setConfirmText('');
    setShowError(false);
    setConfirmStep(1);
  };
  
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetState();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 mt-6 transition-all">
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <DialogTitle className="text-xl font-bold text-red-600">
              Delete Account
            </DialogTitle>
          </div>
          <DialogDescription className="mt-4 text-gray-700">
            {confirmStep === 1 ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">This action will:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                      <li>Permanently delete all your data</li>
                      <li>Remove access to all services</li>
                      <li>Cancel any active subscriptions</li>
                      <li>Remove you from all groups and shared resources</li>
                    </ul>
                  </div>
                </div>
                <p>Are you sure you want to proceed?</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-3 rounded-md flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-800"><span className="font-bold">Warning:</span> This action cannot be undone. All your data will be permanently erased.</p>
                </div>
                <p>To confirm deletion, please type <span className="font-bold text-red-600">DELETE</span> below:</p>
                <Input 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className={`border ${showError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Type DELETE to confirm"
                  aria-label="Confirmation text"
                />
                {showError && (
                  <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" /> Please type DELETE exactly as shown
                  </p>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 mt-2">
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          
          <Button 
            className={`w-full ${confirmStep === 1 
              ? 'bg-amber-600 hover:bg-amber-700' 
              : `bg-red-600 ${!isConfirmTextValid ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'}`} text-white`}
            onClick={handleDelete}
          >
            {confirmStep === 1 ? "Continue" : "Permanently Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;