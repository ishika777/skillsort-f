import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
    DrawerTitle
  } from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { Cog } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CompanyDetails = () => {
  return (
    <div>
        <Drawer direction="right">
  <DrawerTrigger asChild>
    <Button className="flex items-center gap-2">
      <Cog size={16} /> {/* Assuming you want a settings icon */}
      Company Settings
    </Button>
  </DrawerTrigger>
  <DrawerContent className="w-[450px] p-6 bg-white rounded-lg shadow-lg">
    <DrawerHeader>
      <DrawerTitle className="text-xl font-semibold">🏢 Company Settings</DrawerTitle>
    </DrawerHeader>
    <div className="space-y-4">
      <Input placeholder="Company Name" />
      <Input placeholder="Industry" />
      <Input placeholder="Location" />
      <Button className="w-full">Save Changes</Button>
    </div>
  </DrawerContent>
</Drawer>

    </div>
  )
}

export default CompanyDetails

