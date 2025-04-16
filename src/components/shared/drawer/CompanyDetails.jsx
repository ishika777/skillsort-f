import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Cog } from 'lucide-react';
import { Input } from "@/components/ui/input";

const CompanyDetails = () => {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Cog size={16} />
                    Company Settings
                </Button>
            </DrawerTrigger>

            <DrawerContent className="w-[450px] p-6 bg-white rounded-lg shadow-lg">
                <DrawerClose className="absolute right-4 top-4" />

                <DrawerHeader>
                    <DrawerTitle className="text-xl font-semibold">🏢 Company Settings</DrawerTitle>
                    <DrawerDescription>
                        Update your company details here.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="space-y-4">
                    <Input placeholder="Company Name" />
                    <Input placeholder="Industry" />
                    <Input placeholder="Location" />
                </div>

                <DrawerFooter className="flex gap-2">
                    <Button className="w-full">Save Changes</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CompanyDetails;
