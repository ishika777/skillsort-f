import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link as LinkIcon, Linkedin, Github, Twitter, File, Loader2, UserCircle2, Building, Upload, AlertCircle } from "lucide-react";
import SignupNav from "./SignupNav";
import ExperienceForm from "./ExperienceForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { signup } from "@/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfessionalSignup = ({ input, setInput }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);

    const changeUrlHandler = (e) => {
        setInput({
            ...input,
            url: {
                ...input.url,
                [e.target.name]: e.target.value
            }
        });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        console.log(file);
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (file?.size >= maxSize) {
            toast.error("File size should not exceed 5MB.");
            return;
        }
        setInput({ ...input, resume: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (input?.resume?.size >= maxSize) {
            toast.error("File size should not exceed 5MB.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("contact", input.contact);
            formData.append("role", input.role);

            if (input.profilePicture) {
                formData.append("profilePicture", input.profilePicture);
            }
            if (input.resume) {
                formData.append("resume", input.resume);
            }
            for (let key in input.url) {
                formData.append(`url[${key}]`, input.url[key]);
            }
            input.experience.forEach((exp, idx) => {
                for (let key in exp) {
                    formData.append(`experience[${idx}][${key}]`, exp[key]);
                }
            });
            input.education.forEach((edu, idx) => {
                for (let key in edu) {
                    formData.append(`education[${idx}][${key}]`, edu[key]);
                }
            });
            const success = await signup(dispatch, formData);
            if (success) {
                navigate("/verify-email");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="tabs-scroll w-full overflow-y-auto h-full pt-4">
            <div className="w-full max-w-7xl px-4 py-3">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Complete Your Professional Profile</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-center mt-2">Share your experience and professional links to make your profile stand out</p>
                </div>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="shadow-md border-0">
                            <CardContent className="px-5">
                                <h2 className="text-lg font-semibold ml-2 text-gray-800">Experience</h2>
                                <div className="h-fit tabs-scroll overflow-y-auto pr-2 custom-scrollbar">
                                    <ExperienceForm input={input} setInput={setInput} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-0">
                            <CardContent className="px-5">
                                <div className="mb-6">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        I am looking to
                                    </Label>
                                    <RadioGroup 
                                        value={input.role} 
                                        onValueChange={(val) => setInput({ ...input, role: val })}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                                            input.role === "Employee" 
                                                ? "border-blue-500 bg-blue-50" 
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                            <RadioGroupItem value="Employee" id="Employee" className="sr-only" />
                                            <Label htmlFor="Employee" className="flex items-center cursor-pointer w-full">
                                                <UserCircle2 className={`h-5 w-5 mr-3 ${
                                                    input.role === "Employee" ? "text-blue-500" : "text-gray-400"
                                                }`} />
                                                <div>
                                                    <span className={`block ${input.role === "Employee" ? "font-medium" : ""}`}>
                                                        Find Jobs
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        I want to apply for positions
                                                    </span>
                                                </div>
                                            </Label>
                                        </div>
                                        
                                        <div className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                                            input.role === "Recruiter" 
                                                ? "border-blue-500 bg-blue-50 " 
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                            <RadioGroupItem value="Recruiter" id="Recruiter" className="sr-only" />
                                            <Label htmlFor="Recruiter" className="flex items-center cursor-pointer w-full">
                                                <Building className={`h-5 w-5 mr-3 ${
                                                    input.role === "Recruiter" ? "text-blue-500" : "text-gray-400"
                                                }`} />
                                                <div>
                                                    <span className={`block ${input.role === "Recruiter" ? "font-medium" : ""}`}>
                                                        Hire Talent
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        I want to post jobs
                                                    </span>
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Resume Upload */}
                                <div className="mb-6">
                                    <Label htmlFor="resume" className="text-sm font-medium text-gray-700 mb-2 block">
                                        Resume / CV
                                    </Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                                        <div className="flex flex-col items-center justify-center">
                                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600 mb-2">
                                                {input.resume ? input.resume.name : "Upload your resume (PDF only)"}
                                            </p>
                                            <div className="text-xs flex items-center text-gray-500">
                                                <AlertCircle size={12} className="mr-1" />
                                                Max size: 5MB
                                            </div>
                                            
                                            <Input
                                                id="resume"
                                                type="file"
                                                name="resume"
                                                accept=".pdf"
                                                onChange={fileChangeHandler}
                                                className="hidden"
                                            />
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                size="sm" 
                                                className="mt-3"
                                                onClick={() => document.getElementById('resume').click()}
                                            >
                                                Select File
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Links */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Professional Links
                                        <span className="text-red-500 font-normal text-xs ml-1">(LinkedIn, GitHub - required)</span>
                                    </Label>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="LinkedIn Profile URL"
                                                name="linkedIn"
                                                value={input.url.linkedIn}
                                                onChange={changeUrlHandler}
                                                required
                                                className="pl-10 h-11 border-gray-200  rounded-lg"
                                            />
                                            <div className="absolute left-3 top-3">
                                                <Linkedin className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                        
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="GitHub Profile URL"
                                                name="gitHub"
                                                value={input.url.gitHub}
                                                onChange={changeUrlHandler}
                                                required
                                                className="pl-10 h-11 border-gray-200  rounded-lg"
                                            />
                                            <div className="absolute left-3 top-3">
                                                <Github className="h-5 w-5 text-gray-700" />
                                            </div>
                                        </div>
                                        
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="Twitter Profile URL (optional)"
                                                name="twitter"
                                                value={input.url.twitter}
                                                onChange={changeUrlHandler}
                                                className="pl-10 h-11 border-gray-200 rounded-lg"
                                            />
                                            <div className="absolute left-3 top-3">
                                                <Twitter className="h-5 w-5 text-blue-400" />
                                            </div>
                                        </div>
                                        
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="Portfolio Website URL (optional)"
                                                name="portfolio"
                                                value={input.url.portfolio}
                                                onChange={changeUrlHandler}
                                                className="pl-10 h-11 border-gray-200 rounded-lg"
                                            />
                                            <div className="absolute left-3 top-3">
                                                <LinkIcon className="h-5 w-5 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 mb-8">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-10 rounded-lg shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating your account...
                                </>
                            ) : (
                                "Complete Registration"
                            )}
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            By completing registration, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfessionalSignup;