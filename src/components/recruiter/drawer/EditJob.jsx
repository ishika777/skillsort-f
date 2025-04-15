import { useState } from "react"
import { Loader2, Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Drawer, DrawerDescription, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { editJob } from "@/actions/job-actions"

const EditJob = ({job}) => {
    const { loading } = useSelector((state) => state.job)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

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
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.jobType) {
            toast.error("Please select a job type.")
            return
        }
        if (!input.experience) {
            toast.error("Please select experinece required")
            return
        }
        if (!input.qualification) {
            toast.error("Please select qualification required")
            return
        }
        if (!input.location) {
            toast.error("Please select job location")
            return
        }
        input.skills =  Array.isArray(input.skills) ? input.skills : input.skills.split(",").map(skill => skill.trim()),
        console.log(input)
        try {
            const success = await editJob(dispatch, input);
            if (success) {
                setInput({
                    title: job.title,
                    jobType: job.jobType,
                    description: job.description,
                    skills: job.skills.join(","),
                    experience: job.experience,
                    qualification: job.qualification,
                    location: job.location,
                    salary: job.salary,
                    deadline: job.deadline,
                    openings: job.openings,
                })
                setOpen(false)
            }
        } catch (error) {

        }
    }



    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Pen />
                </Button>

            </DrawerTrigger>
            <DrawerContent aria-describedby="new-job-description" className="w-[450px] p-6 bg-white rounded-lg shadow-lg">

                <DrawerHeader>
                    <DrawerTitle className="text-xl font-semibold">Post a New Job</DrawerTitle>
                    <DrawerDescription className="mb-4 text-gray-600 text-sm">Fill in the details of the new job</DrawerDescription>
                </DrawerHeader>
                <form onSubmit={submitHandler} className="h-full w-full">
                    <div className="flex flex-col justify-between items-center w-full h-full">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                value={input.title}
                                name="title"
                                onChange={handleInputChange}
                                placeholder="Job Title"
                                required
                            />

                            {/* Job Type Dropdown */}
                            <Select value={input.jobType} required onValueChange={(value) => setInput({ ...input, jobType: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                </SelectContent>
                            </Select>

                            <Textarea
                                name="description"
                                onChange={handleInputChange}
                                placeholder="Job Description"
                                value={input.description}
                                className="col-span-2"
                                required
                            />
                            <Input
                                name="skills"
                                onChange={handleInputChange}
                                value={input.skills}
                                type="text"
                                placeholder="Required Skills (comma separated)"
                                className="col-span-2"
                                required />

                            {/* Experience Required Dropdown */}
                            <Select value={input.experience} required onValueChange={(value) => setInput({ ...input, experience: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Experience Required" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-1">0-1 year</SelectItem>
                                    <SelectItem value="1-3">1-3 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="5+">5+ years</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Minimum Qualification Dropdown */}
                            <Select value={input.qualification} required onValueChange={(value) => setInput({ ...input, qualification: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Minimum Qualification" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="High School">High School</SelectItem>
                                    <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                                    <SelectItem value="Master's">Master's</SelectItem>
                                    <SelectItem value="PhD">PhD</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Job Location Dropdown */}
                            <Select value={input.location} required onValueChange={(value) => setInput({ ...input, location: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Job Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="On-Site">On-Site</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input
                                name="salary"
                                onChange={handleInputChange}
                                value={input.salary}
                                type="text"
                                required
                                placeholder="Salary Range (e.g., ₹6-10 LPA)"

                            />

                            <Input
                                type="date"
                                name="deadline"
                                onChange={handleInputChange}
                                value={input.deadline}
                                required
                            />
                            <Input
                                type="text"
                                name="openings"
                                onChange={handleInputChange}
                                value={input.openings}
                                placeholder="Number of openings"
                                required
                            />
                        </div>
                        <DrawerFooter className="mt-4 w-full">
                            <Button className="w-full" disabled={loading}>
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
                    </div>
                </form>

            </DrawerContent>
        </Drawer>
    )
}

export default EditJob