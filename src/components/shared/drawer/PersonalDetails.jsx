import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChangePassword from "../../shared/dialog/ChangePassword";

const PersonalDetails = () => {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button className="flex items-center gap-2">
                    Update Personal Details
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerClose className="absolute right-4 top-4" />

                <DrawerHeader>
                    <DrawerTitle>Update Personal Details</DrawerTitle>
                    <DrawerDescription>
                        You can change your profile information here.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-6">
                    <div className="flex flex-col items-center space-y-3">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/path-to-profile.jpg" alt="Profile Picture" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input type="file" accept="image/*" className="w-full" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium">Current Name: John Doe</p>
                        <Input placeholder="Enter New Name" />
                    </div>

                    <ChangePassword />
                </div>

                <DrawerFooter className="flex gap-2">
                    <Button onClick={() => { }}>Update Profile</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default PersonalDetails;
