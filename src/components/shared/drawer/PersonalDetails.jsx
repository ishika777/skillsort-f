import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription, } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Github, Link, Linkedin, Loader2, Plus, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { updatePersonalDetails } from "@/actions/user-actions";
import { toast } from "sonner";

const PersonalDetails = () => {
    const { user, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(user.profilePicture);
    const [backendImage, setBackendImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [input, setInput] = useState({
        fullname: user.fullname,
        contact: user.contact,
        url: {
            linkedIn: user.url.linkedIn,
            gitHub: user.url.gitHub,
            twitter: user.url.twitter,
            portfolio: user.url.portfolio
        },
    })

    const inittials = user.fullname.split(" ").map(part => part[0]).join("").toUpperCase();

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setBackendImage(file)
        const imageURL = URL.createObjectURL(file);
        setProfileImage(imageURL);
    }
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
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("contact", input.contact);
            formData.append("linkedIn", input.url.linkedIn);
            formData.append("gitHub", input.url.gitHub);
            formData.append("twitter", input.url.twitter);
            formData.append("portfolio", input.url.portfolio);
            if (profileImage) {
                formData.append("profilePicture", backendImage);
            }
            if (resume) {
                formData.append("resume", resume);
            }
            await updatePersonalDetails(dispatch, formData);
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

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center ">
                            <Label htmlFor="image" className="relative cursor-pointer">
                                <div className="absolute z-10 opacity-0 hover:opacity-20 transition w-28 h-28 rounded-full flex items-center justify-center">
                                    <Plus className=" text-black h-15 w-15" />
                                </div>
                                <Avatar className="w-28 h-28">
                                    <AvatarImage src={profileImage} alt="Profile Picture" />
                                    <AvatarFallback>{inittials}</AvatarFallback>
                                </Avatar>
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="w-full hidden"
                                onChange={imageHandler}
                            />

                        </div>

                        <div className="flex flex-col gap-4">
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
                    </div>

                    <div className="">

                        <Label className="mb-2">Resume</Label>
                        <div className="flex">
                            <Input
                                name="resume"
                                type="file"
                                accept=".pdf"
                                className="w-full"
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col w-full mb-2">
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
                        <div className="flex flex-col w-full mb-2">
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
                        <div className="flex flex-col w-full mb-2">
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
                        <div className="flex flex-col w-full mb-2">
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
