import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from 'lucide-react';

const PasswordRequirement = ({ text, satisfied }) => (
  <div className="flex items-center gap-2 text-sm">
    <span>{satisfied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}</span>
    <span className={satisfied ? "text-green-500" : "text-gray-500"}>{text}</span>
  </div>
);

const ChangePassword = () => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null, 'error', 'success'
  const [formMessage, setFormMessage] = useState("");
  
  // Password requirements checks
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";
  
  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && 
                             hasNumber && hasSpecialChar && passwordsMatch;
  
  const handleSubmit = () => {
    if (!oldPassword) {
      setFormStatus('error');
      setFormMessage('Please enter your current password');
      return;
    }
    
    if (!allRequirementsMet) {
      setFormStatus('error');
      setFormMessage('Please meet all password requirements');
      return;
    }
    
    // Mock successful password change
    setFormStatus('success');
    setFormMessage('Password changed successfully!');
    
    // Reset form after success
    setTimeout(() => {
      setShowPasswordDialog(false);
      resetForm();
    }, 2000);
  };
  
  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFormStatus(null);
    setFormMessage("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };
  
  const handleDialogChange = (open) => {
    setShowPasswordDialog(open);
    if (!open) resetForm();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Dialog open={showPasswordDialog} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-all flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Change Your Password</DialogTitle>
          </DialogHeader>
          
          {formStatus === 'success' && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2 animate-pulse">
              <CheckCircle className="h-5 w-5" />
              {formMessage}
            </div>
          )}
          
          {formStatus === 'error' && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {formMessage}
            </div>
          )}
          
          <div className="space-y-4 py-2">
            <div className="relative">
              <Input 
                type={showOldPassword ? "text" : "password"} 
                placeholder="Current Password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="pr-10"
                aria-label="Current Password"
              />
              <button 
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="relative">
              <Input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="New Password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
                aria-label="New Password"
              />
              <button 
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm New Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                aria-label="Confirm New Password"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {newPassword && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-2 text-gray-700">Password Requirements:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <PasswordRequirement text="At least 8 characters" satisfied={hasMinLength} />
                  <PasswordRequirement text="At least 1 uppercase letter" satisfied={hasUpperCase} />
                  <PasswordRequirement text="At least 1 lowercase letter" satisfied={hasLowerCase} />
                  <PasswordRequirement text="At least 1 number" satisfied={hasNumber} />
                  <PasswordRequirement text="At least 1 special character" satisfied={hasSpecialChar} />
                  <PasswordRequirement text="Passwords match" satisfied={passwordsMatch} />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleDialogChange(false)}
              className="sm:order-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!allRequirementsMet || !oldPassword}
              className={`${!allRequirementsMet || !oldPassword ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all sm:order-2`}
            >
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePassword;