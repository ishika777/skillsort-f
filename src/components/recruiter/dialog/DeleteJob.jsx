import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import React from 'react'

const DeleteJob = ({job}) => {

    const deleteHandler = async () => {
        
    }
  return (
    <div className=''>
            <Dialog className="w-full">
                <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full hover:bg-red-700">
                        <Trash2 />
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-red-600">Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 flex flex-col items-start justify-start">
                        <p className="text-gray-700">
                            Are you sure you want to delete this job? <br />
                            <span className="font-semibold text-red-500 text-sm">This action cannot be undone.</span>
                        </p>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button className="w-full hover:bg-red-700" onclick={deleteHandler} variant="destructive">Confirm Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
  )
}

export default DeleteJob