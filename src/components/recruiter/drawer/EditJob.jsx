import { useState } from "react";
import { Loader2, Pen, BriefcaseBusiness, Calendar, MapPin, BadgeDollarSign, GraduationCap, Clock, Users, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerDescription, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { editJob } from "@/actions/job-actions";

const EditJob = ({ job }) => {
    const { loading } = useSelector((state) => state.job);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        id: job._id,
        title: job.title,
        jobType: job.jobType,
        description: job.description,
        skills: job.skills.join(","),
        experience: job.experience,
        qualification: job.qualification,
        location: job.location,
        salary: job.salary,
        deadline: job.deadline.split("T")[0],
        openings: job.openings,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.jobType) {
            toast.error("Please select a job type.");
            return;
        }
        if (!input.experience) {
            toast.error("Please select experience required");
            return;
        }
        if (!input.qualification) {
            toast.error("Please select qualification required");
            return;
        }
        if (!input.location) {
            toast.error("Please select job location");
            return;
        }

        input.skills = Array.isArray(input.skills) ? input.skills : input.skills.split(",").map(skill => skill.trim());

        try {
            const success = await editJob(dispatch, input);
            if (success) {
                toast.success("Job updated successfully");
                setOpen(false);
            }
        } catch (error) {
            toast.error("Failed to update job");
        }
    };

    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                    <Pen size={16} />
                    <span className="hidden sm:inline">Edit</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent aria-describedby="edit-job-description" className="w-full max-w-md sm:max-w-lg md:max-w-xl p-0 bg-white rounded-lg shadow-lg overflow-y-auto">
                <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <DrawerHeader className="p-0">
                        <DrawerTitle className="text-xl font-semibold text-green-600 flex items-center gap-2">
                            <BriefcaseBusiness className="text-green-600" />
                            Edit Job Posting
                        </DrawerTitle>
                        <DrawerDescription className="text-gray-600 text-sm">
                            Update the job information below
                        </DrawerDescription>
                    </DrawerHeader>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
                        <X size={18} />
                    </Button>
                </div>

                <form onSubmit={submitHandler} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <BriefcaseBusiness size={16} className="text-gray-500" />
                                Job Title
                            </label>
                            <Input
                                id="title"
                                value={input.title}
                                name="title"
                                onChange={handleInputChange}
                                placeholder="e.g. Senior Software Engineer"
                                required
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="jobType" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Clock size={16} className="text-gray-500" />
                                    Job Type
                                </label>
                                <Select value={input.jobType} required onValueChange={(value) => setInput({ ...input, jobType: value })}>
                                    <SelectTrigger id="jobType" className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                        <SelectValue placeholder="Select Job Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-500" />
                                    Job Location
                                </label>
                                <Select value={input.location} required onValueChange={(value) => setInput({ ...input, location: value })}>
                                    <SelectTrigger id="location" className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                        <SelectValue placeholder="Job Location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="On-Site">On-Site</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Award size={16} className="text-gray-500" />
                                Job Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                onChange={handleInputChange}
                                placeholder="Describe the role, responsibilities, and requirements"
                                value={input.description}
                                className="min-h-32 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="skills" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Award size={16} className="text-gray-500" />
                                Required Skills
                            </label>
                            <Input
                                id="skills"
                                name="skills"
                                onChange={handleInputChange}
                                value={input.skills}
                                type="text"
                                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="experience" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Award size={16} className="text-gray-500" />
                                    Experience Required
                                </label>
                                <Select value={input.experience} required onValueChange={(value) => setInput({ ...input, experience: value })}>
                                    <SelectTrigger id="experience" className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                        <SelectValue placeholder="Experience Required" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0-1">0-1 year</SelectItem>
                                        <SelectItem value="1-3">1-3 years</SelectItem>
                                        <SelectItem value="3-5">3-5 years</SelectItem>
                                        <SelectItem value="5+">5+ years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="qualification" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <GraduationCap size={16} className="text-gray-500" />
                                    Minimum Qualification
                                </label>
                                <Select value={input.qualification} required onValueChange={(value) => setInput({ ...input, qualification: value })}>
                                    <SelectTrigger id="qualification" className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                        <SelectValue placeholder="Minimum Qualification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High School">High School</SelectItem>
                                        <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                                        <SelectItem value="Master's">Master's</SelectItem>
                                        <SelectItem value="PhD">PhD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="salary" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <BadgeDollarSign size={16} className="text-gray-500" />
                                    Salary Range
                                </label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    onChange={handleInputChange}
                                    value={input.salary}
                                    type="text"
                                    required
                                    placeholder="e.g., ₹6-10 LPA"
                                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="openings" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Users size={16} className="text-gray-500" />
                                    Number of Openings
                                </label>
                                <Input
                                    id="openings"
                                    type="text"
                                    name="openings"
                                    onChange={handleInputChange}
                                    value={input.openings}
                                    placeholder="e.g., 3"
                                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="deadline" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} className="text-gray-500" />
                                Application Deadline
                            </label>
                            <Input
                                id="deadline"
                                type="date"
                                name="deadline"
                                onChange={handleInputChange}
                                value={input.deadline}
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    <DrawerFooter className="p-0 mt-6">
                        <div className="flex gap-3 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default EditJob;