import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription, } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Github, Link, Linkedin, Loader2, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { updatePersonalDetails } from "@/actions/user-actions";
import { toast } from "sonner";

const PersonalDetails = () => {
    const { user, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        fullname: user.fullname,
        contact: user.contact,
        url: {
            linkedIn: user.url.linkedIn,
            gitHub: user.url.gitHub,
            twitter: user.url.twitter,
            portfolio: user.url.portfolio
        },
        // resume: null
    })

    const changeHandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeUrlHandler = (e) => {
        setInput((prev) => ({
            ...prev,
            url: {
                ...prev.url,
                [e.target.name]: e.target.value,
            },
        }));
    }

    const submitHandler = async () => {
        console.log(input)
        if (!input.fullname) {
            toast.error("Enter valid name!")
            return;
        }
        if (String(input.contact).length != 10) {
            toast.error("Enter valid contact number!")
            return;
        }
        if (!input.url.linkedIn) {
            toast.error("LinkedIn is required!")
            return;
        }
        if (!input.url.gitHub) {
            toast.error("GitHub is required!")
            return;
        }

        try {
            await updatePersonalDetails(dispatch, input);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Drawer direction="right" className="overflow-auto">
            <DrawerTrigger asChild>
                <Button className="bg-red-50 hover:bg-red-100" variant="ghost" size="sm" onClick={(e) => e.currentTarget.blur()} >
                    <Edit className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-red-500 text-md">Edit</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle>Update Personal Details</DrawerTitle>
                    <DrawerDescription></DrawerDescription>

                </DrawerHeader>

                <div className="p-4 space-y-6">
                    <div className="flex flex-col items-center space-y-3 bg-amber-200">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/path-to-profile.jpg" alt="Profile Picture" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input type="file" accept="image/*" className="w-full" />
                    </div>

                    {/* Name and Contact in a row */}
                    <div className="flex gap-4">
                        <Input
                            name="fullname"
                            value={input.fullname}
                            placeholder="Enter New Name"
                            className="flex-1"
                            onChange={changeHandler}
                        />
                        <Input
                            name="contact"
                            value={input.contact}
                            type="number"
                            placeholder="Enter New Contact"
                            className="flex-1"
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="bg-amber-200">

                        <Label className="mb-2">Resume</Label>
                        {/* <div className="flex">
                        <Input 
                        name="resume"
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        className="w-full"                              
                        onChange={changeHandler}
                        />
                    </div>  */}
                    </div>

                    {/* Social Links */}
                    <div>
                        <div className="flex flex-col w-full">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="LinkedIn"
                                    name="linkedIn"
                                    value={input.url.linkedIn}
                                    onChange={changeUrlHandler}
                                    required
                                    className="pl-10"
                                />
                                <Linkedin className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="GitHub"
                                    name="gitHub"
                                    value={input.url.gitHub}
                                    onChange={changeUrlHandler}
                                    required
                                    className="pl-10"
                                />
                                <Github className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Twitter"
                                    name="twitter"
                                    value={input.url.twitter}
                                    onChange={changeUrlHandler}
                                    className="pl-10"
                                />
                                <Twitter className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Portfolio"
                                    name="portfolio"
                                    value={input.url.portfolio}
                                    onChange={changeUrlHandler}
                                    className="pl-10"
                                />
                                <Link className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <DrawerFooter className="flex gap-2">
                    <Button
                        disabled={loading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                        onClick={submitHandler}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default PersonalDetails;
