import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Linkedin, Github, Twitter, File } from "lucide-react";
import SignupNav from "./SignupNav";
import ExperienceForm from "./ExperienceForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { signup } from "@/actions/user-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const ProfessionalSignup = ({ input, setInput }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeUrlHandler = (e) => {
        setInput({
            ...input,
            url: {
                ...input.url,
                [e.target.name]: e.target.value
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            const success = await signup(dispatch, input);
            if (success) {
                navigate("/verify-email");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="flex flex-col w-full items-center justify-start h-screen ">
            <SignupNav />
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center justify-between w-full px-10 gap-4">

                <div className="flex flex-1 gap-4 w-full">
                    <div className="flex flex-1 h-full w-full overflow-y-auto">
                        <ExperienceForm input={input} setInput={setInput} />
                    </div>


                    <div className="flex flex-1 flex-col items-start justify-start w-full gap-3">
                        <Label className="mt-4">
                            Role
                        </Label>
                        <div className="flex flex-col w-full mb-4">
                            <RadioGroup value={input.role} onValueChange={(val) => setInput({ ...input, role: val })}>
                                <div className="flex items-center gap-10">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Employee" id="Employee" />
                                        <Label htmlFor="Employee">Employee</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Recruiter" id="Recruiter" />
                                        <Label htmlFor="Recruiter">Recruiter</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex flex-col w-full">
                            <Label htmlFor="resume" className="mb-1">Resume</Label>
                            <div className="relative">
                                <Input
                                    id="resume"
                                    type="text"
                                    placeholder="Upload Resume"
                                    name="resume"
                                    value={input.resume}
                                    onChange={changeEventHandler}
                                    className="pl-10"
                                />
                                <File className="absolute left-3 top-2.5 h-5 w-5" />
                            </div>
                        </div>
                        <Label className="-mb-1 mt-4">
                            Url
                            <span className="text-red-500 font-normal text-xs">(LinkedIn, GitHub - required)</span>
                        </Label>
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

                <div className="mb-3 w-full">
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-medium">
                        Sign Up
                    </Button>
                </div>
            </form>

        </div>
    );
}

export default ProfessionalSignup
