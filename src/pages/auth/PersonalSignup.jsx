import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, PhoneCall, User2, LockKeyhole, UploadCloud } from "lucide-react";
import EducationForm from "./EducationForm";
import SignupNav from "./SignupNav";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PersonalSignup = ({ input, setInput, setActiveTab }) => {
    const navigate = useNavigate();
    const [seePassword, setSeePassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);


    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const fileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            // No need for async/await here
            setInput((prev) => ({
                ...prev,
                profilePicture: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!submitted) {
            toast.error("Please fill in the education details before proceeding.");
            return;
        }
        setActiveTab("professional");

    };

    return (
        <div className="flex flex-col items-center justify-start w-full h-screen overflow-y-auto bg-white">
            <SignupNav />
            <form onSubmit={submitHandler} className="flex flex-col h-full items-center justify-between w-full px-10 gap-4">

                <div className="flex flex-1 flex-col gap-4 w-full">
                    <div className="flex items-center justify-between w-full gap-7">
                        <div className="flex flex-col w-full">
                            <Label htmlFor="fullname" className="mb-1">Full Name</Label>
                            <div className="relative">
                                <Input
                                    id="fullname"
                                    type="text"
                                    placeholder="John Doe"
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={changeHandler}
                                    required
                                    className="pl-10"
                                />
                                <User2 className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <Label className="mb-1" htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    name="email"
                                    value={input.email}
                                    onChange={changeHandler}
                                    required
                                    className="pl-10"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full mb-5 gap-7">
                        <div className="flex flex-col w-full">
                            <Label className="mb-1" htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={seePassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    name="password"
                                    value={input.password}
                                    onChange={changeHandler}
                                    required
                                    className="pl-10"
                                />
                                <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5" />
                                <button
                                    type="button"
                                    onClick={() => setSeePassword(!seePassword)}
                                    className="absolute right-3 top-2.5"
                                >
                                    {seePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <Label className="mb-1" htmlFor="contact">Contact Number</Label>
                            <div className="relative">
                                <Input
                                    id="contact"
                                    type="tel"
                                    placeholder="1234567890"
                                    name="contact"
                                    value={input.contact}
                                    onChange={changeHandler}
                                    required
                                    className="pl-10"
                                />
                                <PhoneCall className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 w-full items-center col-span-2 justify-between">
                        <div className="flex mr-40 ml-15 flex-col  items-center justify-start mb-1  sm:col-span-2">
                            <Label className="mb-1" htmlFor="profilePicture">Profile Picture</Label>
                            <Input
                                id="profilePicture"
                                name="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={fileHandler}
                                className="hidden"
                            />
                            <div className="relative">
                                <div className="rounded-full overflow-hidden h-39 w-39 ">
                                    <img className={`h-40 mx-auto`} src={`${input.profilePicture === null ? "./new.png" : input.profilePicture}`} alt="" />
                                </div>
                                <Label htmlFor="profilePicture" className="absolute -top-2 -left-2 opacity-0 hover:opacity-100 cursor-pointer p-2 rounded-lg flex items-center">
                                    <div className="relative bg-white  opacity-20 h-39 w-39 rounded-full flex items-center justify-between">
                                        <UploadCloud className="absolute top-15 left-15 h-10 w-10 mr-2" />
                                    </div>
                                </Label>
                            </div>
                        </div>
                        <EducationForm submitted={submitted} setSubmitted={setSubmitted} input={input} setInput={setInput} />
                    </div>
                </div>

                <div className="mb-3 w-full">
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-medium">
                        Next
                    </Button>
                </div>
            </form>
        </div>

    );
};

export default PersonalSignup;
