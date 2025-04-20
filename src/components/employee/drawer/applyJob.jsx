import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { applyForJob } from "@/actions/application-action";

const ApplyJob = ({ job }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.application);

    const [resumeOption, setResumeOption] = useState(user?.resume?.url ? "profile" : "upload");
    const [newResume, setNewResume] = useState(null);
    const [cv, setCV] = useState(null);

    const submitApplication = async () => {
        console.log(job)
        if (!user.resume?.url && !newResume) {
            toast.error("Please upload your resume.");
            return;
        }
        try {
            const formData = new FormData();
            if (cv) {
                formData.append("cv", cv);
            }
            if (resumeOption === "profile") {
                formData.append("resumeUrl", user?.resume?.url);
                formData.append("resumePublicId", user?.resume?.publicId);
            } else if (resumeOption === "upload") {
                formData.append("resume", newResume);
            }
            formData.append("jobId", job._id);
            formData.append("resumeOption", resumeOption);
            await applyForJob(dispatch, formData)

        } catch (error) {

        }
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="px-4 py-5 text-md bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.currentTarget.blur()}
                >
                    Apply Now
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                        <span>Apply for this Job</span>
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-500">
                        Fill in your details to submit an application.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-6 max-h-[75vh] overflow-y-auto">
                    <div className="space-y-3">
                        <Label className="font-medium">
                            Resume <span className="text-red-500">*</span>
                        </Label>

                        {user?.resume?.url ? (
                            <>
                                <div className="space-y-3">
                                    <RadioGroup
                                        defaultValue={resumeOption}
                                        value={resumeOption}
                                        onValueChange={(value) => setResumeOption(value)}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="profile" id="profile" />
                                            <Label htmlFor="profile" className="text-sm cursor-pointer">
                                                Use resume from profile
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="upload" id="upload" />
                                            <Label htmlFor="upload" className="text-sm cursor-pointer">
                                                Upload new resume
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {resumeOption === "upload" && (
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setNewResume(e.target.files[0])}
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    No resume found in profile. Please upload one.
                                </p>
                                <Input
                                    type="file"
                                    accept=".pdf"
                                    required
                                    onChange={(e) => setNewResume(e.target.files[0])}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label className="font-medium">CV (Optional)</Label>
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setCV(e.target.files[0])}
                        />
                    </div>
                </div>

                <DrawerFooter className="flex gap-2">
                    <Button
                        onClick={submitApplication}
                        disabled={loading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting Application...
                            </>
                        ) : (
                            "Apply Now"
                        )}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ApplyJob;
