import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React from 'react'

const DeleteAccount = ({deleteHandler}) => {

    return (
            <Dialog >
                <DialogTrigger asChild>
                    <Button variant="destructive" className="hover:bg-red-700">
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-6 bg-white rounded-lg shadow-lg w-full">
                    <DialogHeader className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-red-600">
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription className="w-full">
                            Are you sure you want to delete your account? <br />
                            <span className="font-semibold text-red-500">This action cannot be undone.</span>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button className="w-full hover:bg-red-700" onClick={deleteHandler} variant="destructive">
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}

export default DeleteAccount
