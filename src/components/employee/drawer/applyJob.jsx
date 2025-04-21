import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Upload, Check, File } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { applyForJob } from "@/actions/application-action";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ApplyJob = ({ job }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.application);

    const [resumeOption, setResumeOption] = useState(user?.resume?.url ? "profile" : "upload");
    const [newResume, setNewResume] = useState(null);
    const [cv, setCV] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Display file names instead of just showing that files were selected
    const resumeFileName = newResume?.name || (user?.resume?.url ? "Your current resume" : "");
    const cvFileName = cv?.name || "";

    const submitApplication = async () => {
        if (!user.resume?.url && !newResume) {
            toast.error("Please upload your resume");
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
            
            const result = await applyForJob(dispatch, formData);
            if (result?.success) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (error) {
            toast.error("Failed to submit application");
        }
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="px-5 py-6 text-md bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 font-medium"
                    onClick={(e) => e.currentTarget.blur()}
                >
                    <FileText className="w-5 h-5" /> Apply Now
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4">
                <DrawerHeader className="pb-2">
                    <DrawerTitle className="text-2xl font-bold text-gray-800">
                        Apply for {job.title || "this position"}
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-600 mt-1">
                        <Badge className="bg-blue-100 text-blue-800 mr-2 font-normal">
                            {job.company || "Company"}
                        </Badge>
                        {job.location && (
                            <Badge className="bg-gray-100 text-gray-800 font-normal">
                                {job.location}
                            </Badge>
                        )}
                    </DrawerDescription>
                </DrawerHeader>

                <Separator className="my-4" />

                <div className="p-2 space-y-6 max-h-[70vh] overflow-y-auto">
                    {showSuccess ? (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-green-800">Application Submitted!</h4>
                                <p className="text-green-700 text-sm">Your application has been received successfully.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                    <Label className="font-semibold text-gray-800 text-lg">
                                        Resume <span className="text-red-500">*</span>
                                    </Label>
                                </div>

                                {user?.resume?.url ? (
                                    <div className="space-y-4 pl-2">
                                        <RadioGroup
                                            defaultValue={resumeOption}
                                            value={resumeOption}
                                            onValueChange={(value) => setResumeOption(value)}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="profile" id="profile" />
                                                <Label htmlFor="profile" className="cursor-pointer">
                                                    <div className="font-medium">Use resume from profile</div>
                                                    <p className="text-sm text-gray-500">Use your existing uploaded resume</p>
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="upload" id="upload" />
                                                <Label htmlFor="upload" className="cursor-pointer">
                                                    <div className="font-medium">Upload new resume</div>
                                                    <p className="text-sm text-gray-500">Upload a different resume for this position</p>
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        {resumeOption === "upload" && (
                                            <div className="mt-2 pl-7">
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                                                    <label className="cursor-pointer w-full block">
                                                        <Input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => setNewResume(e.target.files[0])}
                                                            className="hidden"
                                                        />
                                                        {newResume ? (
                                                            <div className="flex flex-col items-center">
                                                                <File className="w-8 h-8 text-blue-500 mb-2" />
                                                                <span className="text-sm font-medium text-gray-700">{newResume.name}</span>
                                                                <span className="text-xs text-gray-500 mt-1">Click to change</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                                <span className="text-sm font-medium text-gray-700">Click to upload PDF</span>
                                                                <span className="text-xs text-gray-500 mt-1">PDF files only, max 5MB</span>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                                            <p className="text-sm text-amber-700">
                                                No resume found in profile. Please upload one to continue.
                                            </p>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                                            <label className="cursor-pointer w-full block">
                                                <Input
                                                    type="file"
                                                    accept=".pdf"
                                                    required
                                                    onChange={(e) => setNewResume(e.target.files[0])}
                                                    className="hidden"
                                                />
                                                {newResume ? (
                                                    <div className="flex flex-col items-center">
                                                        <File className="w-8 h-8 text-blue-500 mb-2" />
                                                        <span className="text-sm font-medium text-gray-700">{newResume.name}</span>
                                                        <span className="text-xs text-gray-500 mt-1">Click to change</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                        <span className="text-sm font-medium text-gray-700">Click to upload PDF</span>
                                                        <span className="text-xs text-gray-500 mt-1">PDF files only, max 5MB</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 mt-6">
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                    <Label className="font-semibold text-gray-800 text-lg">
                                        CV or Cover Letter (Optional)
                                    </Label>
                                </div>
                                
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                                    <label className="cursor-pointer w-full block">
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setCV(e.target.files[0])}
                                            className="hidden"
                                        />
                                        {cv ? (
                                            <div className="flex flex-col items-center">
                                                <File className="w-8 h-8 text-blue-500 mb-2" />
                                                <span className="text-sm font-medium text-gray-700">{cv.name}</span>
                                                <span className="text-xs text-gray-500 mt-1">Click to change</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <span className="text-sm font-medium text-gray-700">Upload cover letter or CV</span>
                                                <span className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX files, max 5MB</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                                <h4 className="font-medium text-blue-800 mb-1">Application Tips</h4>
                                <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                                    <li>Make sure your resume is up-to-date</li>
                                    <li>Include relevant skills and experience</li>
                                    <li>A cover letter can help you stand out</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                <DrawerFooter className="flex gap-2 pt-4">
                    <Button
                        onClick={submitApplication}
                        disabled={loading || showSuccess}
                        className={`w-full py-6 font-semibold text-lg ${
                            showSuccess ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                        } text-white`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                <span>Submitting Application...</span>
                            </div>
                        ) : showSuccess ? (
                            <div className="flex items-center justify-center">
                                <Check className="mr-2 h-5 w-5" />
                                <span>Application Submitted</span>
                            </div>
                        ) : (
                            "Submit Application"
                        )}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ApplyJob;

