import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

const ApplyJob = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    const [resumeOption, setResumeOption] = useState(user.resume ? "profile" : "upload");
    const [newResume, setNewResume] = useState(null);
    const [cv, setCV] = useState(null);

    const submitApplication = async () => {
        // if (!user.resume && !newResume) {
        //     toast.error("Please upload your resume.");
        //     return;
        // }
        console.log("hiii")
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="mt-4 px-4 py-5 text-md bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition"
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
                    {/* Resume Section */}
                    <div className="space-y-3">
                        <Label className="font-medium">
                            Resume <span className="text-red-500">*</span>
                        </Label>

                        {user.resume ? (
                            <>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="useProfileResume"
                                            name="resumeOption"
                                            checked={resumeOption === "profile"}
                                            onChange={() => setResumeOption("profile")}
                                        />
                                        <Label
                                            htmlFor="useProfileResume"
                                            className="text-sm cursor-pointer"
                                        >
                                            Use resume from profile
                                        </Label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="uploadNewResume"
                                            name="resumeOption"
                                            checked={resumeOption === "upload"}
                                            onChange={() => setResumeOption("upload")}
                                        />
                                        <Label
                                            htmlFor="uploadNewResume"
                                            className="text-sm cursor-pointer"
                                        >
                                            Upload new resume
                                        </Label>
                                    </div>

                                    {resumeOption === "upload" && (
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
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
                                    accept=".pdf,.doc,.docx"
                                    required
                                    onChange={(e) => setNewResume(e.target.files[0])}
                                />
                            </div>
                        )}
                    </div>

                    {/* CV Section */}
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
                                Submitting...
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
