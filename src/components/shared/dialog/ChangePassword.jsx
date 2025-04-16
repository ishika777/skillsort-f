import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChangePassword = () => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  return (
    <div className='w-full'>
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
    <DialogTrigger asChild>
      <Button className="w-full bg-red-500 text-white hover:bg-red-600">Change Password</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <Input type="password" placeholder="Old Password" />
        <Input type="password" placeholder="New Password" />
        <Input type="password" placeholder="Confirm Password" />
      </div>
      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
          Cancel
        </Button>
        <Button onClick={() => setShowPasswordDialog(false)}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
    </div>
  )
}

export default ChangePassword