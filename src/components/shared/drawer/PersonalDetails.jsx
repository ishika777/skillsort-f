import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  Github, 
  Link as LinkIcon, 
  Linkedin, 
  Loader2, 
  Plus, 
  Twitter, 
  Camera, 
  FileText, 
  User, 
  Phone,
  CheckCircle
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { updatePersonalDetails } from "@/actions/user-actions";
import { toast } from "sonner";

const PersonalDetails = () => {
    const { user, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(user?.profilePicture);
    const [backendImage, setBackendImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [resumeName, setResumeName] = useState('');
    const [input, setInput] = useState({
        fullname: user?.fullname,
        contact: user?.contact,
        url: {
            linkedIn: user?.url.linkedIn,
            gitHub: user?.url.gitHub,
            twitter: user?.url.twitter,
            portfolio: user?.url.portfolio
        },
    });

    const initials = user?.fullname?.split(" ").map(part => part[0]).join("").toUpperCase();

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    }

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
            setResumeName(file.name);
        }
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
            toast.error("Enter valid name!");
            return;
        }
        if (String(input.contact).length != 10) {
            toast.error("Enter valid contact number!");
            return;
        }
        if (!input.url.linkedIn) {
            toast.error("LinkedIn is required!");
            return;
        }
        if (!input.url.gitHub) {
            toast.error("GitHub is required!");
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
            if (backendImage) {
                formData.append("profilePicture", backendImage);
            }
            if (resume) {
                formData.append("resume", resume);
            }
            await updatePersonalDetails(dispatch, formData);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }
    }

    return (
        <Drawer direction="right" className="overflow-auto">
            <DrawerTrigger asChild>
                <Button 
                    className="bg-red-50 hover:bg-red-100 transition-colors duration-200" 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => e.currentTarget.blur()}
                >
                    <Edit className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-red-500 text-md">Edit</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-6 max-w-md mx-auto">
                <DrawerHeader className="px-0">
                    <DrawerTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <User className="text-red-500" size={18} />
                        Update Personal Details
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-500">
                        Update your profile information and social links
                    </DrawerDescription>
                </DrawerHeader>

                <Separator className="my-4" />

                <div className="space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center justify-center mb-6">
                        <Label htmlFor="image" className="relative cursor-pointer group">
                            <div className="absolute inset-0 z-10 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition rounded-full flex items-center justify-center">
                                <Camera className="text-white opacity-0 group-hover:opacity-100 transition" size={28} />
                            </div>
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                <AvatarImage src={profileImage} alt="Profile Picture" />
                                <AvatarFallback className="bg-red-100 text-red-500 text-xl font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={imageHandler}
                        />
                        <p className="text-sm text-gray-500 mt-2">Click to update profile picture</p>
                    </div>

                    {/* Personal Info Section */}
                    <Card className="border border-gray-200">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-medium text-gray-700 flex items-center gap-2">
                                <User size={16} />
                                Personal Information
                            </h3>
                            
                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            value={input.fullname}
                                            placeholder="Enter your full name"
                                            className="pl-10"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <Label htmlFor="contact" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Contact Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="contact"
                                            name="contact"
                                            value={input.contact}
                                            type="number"
                                            placeholder="Enter your contact number"
                                            className="pl-10"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resume Section */}
                    <Card className="border border-gray-200">
                        <CardContent className="p-4 space-y-3">
                            <h3 className="font-medium text-gray-700 flex items-center gap-2">
                                <FileText size={16} />
                                Resume
                            </h3>
                            
                            <div className="relative">
                                <Label 
                                    htmlFor="resumeUpload" 
                                    className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition-colors duration-200"
                                >
                                    {resumeName ? (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle size={18} />
                                            <span className="font-medium">{resumeName}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FileText className="h-8 w-8 text-gray-400 mb-1" />
                                            <span className="text-sm text-gray-500">Click to upload your resume (PDF)</span>
                                        </>
                                    )}
                                </Label>
                                <Input
                                    id="resumeUpload"
                                    name="resume"
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={resumeHandler}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Links Section */}
                    <Card className="border border-gray-200">
                        <CardContent className="p-4 space-y-3">
                            <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <LinkIcon size={16} />
                                Social Links
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                                    <Input
                                        type="text"
                                        placeholder="LinkedIn Profile URL"
                                        name="linkedIn"
                                        value={input.url.linkedIn}
                                        onChange={changeUrlHandler}
                                        required
                                        className="pl-10 border-blue-100 focus:border-blue-300"
                                    />
                                </div>
                                
                                <div className="relative">
                                    <Github className="absolute left-3 top-3 h-4 w-4 text-gray-800" />
                                    <Input
                                        type="text"
                                        placeholder="GitHub Profile URL"
                                        name="gitHub"
                                        value={input.url.gitHub}
                                        onChange={changeUrlHandler}
                                        required
                                        className="pl-10 border-gray-200 focus:border-gray-400"
                                    />
                                </div>
                                
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                                    <Input
                                        type="text"
                                        placeholder="Twitter Profile URL"
                                        name="twitter"
                                        value={input.url.twitter}
                                        onChange={changeUrlHandler}
                                        className="pl-10 border-blue-50 focus:border-blue-200"
                                    />
                                </div>
                                
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                                    <Input
                                        type="text"
                                        placeholder="Portfolio Website URL"
                                        name="portfolio"
                                        value={input.url.portfolio}
                                        onChange={changeUrlHandler}
                                        className="pl-10 border-purple-50 focus:border-purple-200"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DrawerFooter className="px-0 pt-6">
                    <div className="flex gap-3">
                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            disabled={loading}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                            onClick={submitHandler}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default PersonalDetails;