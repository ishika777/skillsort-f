import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, PlusCircle, Trash2, Calendar, Building, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { updateExperienceDetails } from "@/actions/user-actions";
import { Textarea } from "@/components/ui/textarea";

const ExperienceDetails = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.user);

    const [input, setInput] = useState(user?.experience || []);

    const handleChange = (index, field, value) => {
        const updated = [...input];
        updated[index][field] = value;
        setInput(updated);
    };

    const addExperience = () => {
        setInput((prev) => [...prev, { jobTitle: "", companyName: "", startDate: "", endDate: "", description: ""}]);
    };

    const removeExperience = (index) => {
        setInput((prev) => prev.filter((_, i) => i !== index));
    };

    const submitHandler = async() => {
        const hasEmptyField = input.some((exp) => {
            return (!exp.jobTitle || !exp.companyName || !exp.startDate || !exp.endDate || !exp.description);
        });
        const invalidTimeline = input.some((exp) => {
            return exp.startDate >= exp.endDate
        })
        if (hasEmptyField) {
            toast.error("Please fill all the experience fields.");
            return;
        }
        if (invalidTimeline) {
            toast.error("Start date must be before end date.");
            return;
        }
        try {
            await updateExperienceDetails(dispatch, input)
            toast.success("Experience details updated successfully!");
        } catch (error) {
            toast.error("Failed to update experience details.");
            console.log(error)
        }
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="bg-red-50 hover:bg-red-100 transition-colors"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.currentTarget.blur()}
                >
                    <Edit className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-red-500 text-md">Edit</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4 bg-white">
                <DrawerHeader className="pb-2 border-b">
                    <DrawerTitle className="flex items-center justify-between text-xl font-bold">
                        <span>Professional Experience</span>
                        <Button 
                            onClick={addExperience} 
                            className="bg-red-100 hover:bg-red-200 transition-colors rounded-full p-2"
                            variant="ghost"
                            size="icon"
                        >
                            <PlusCircle className="text-red-500 hover:text-red-600" size={20} />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-500">
                        Add or update your work experience details
                    </DrawerDescription>
                </DrawerHeader>

                <div className="py-6 space-y-6 max-h-[70vh] tabs-scroll overflow-y-auto">
                    {input.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <PlusCircle className="mx-auto text-gray-400 mb-2" size={30} />
                            <p className="text-gray-500 font-medium">No experience added yet</p>
                            <Button 
                                onClick={addExperience} 
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                            >
                                Add Experience
                            </Button>
                        </div>
                    ) : (
                        input.map((exp, index) => (
                            <div key={index} className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 bg-gray-50 relative shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(index)}
                                        className="text-gray-500 hover:text-red-500 transition-colors bg-white p-1.5 rounded-full border border-gray-200"
                                        aria-label="Remove experience"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                
                                <h3 className="font-medium text-gray-700 mb-2">Experience #{index + 1}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`jobTitle-${index}`}>
                                            <Briefcase className="h-4 w-4 text-gray-500" />
                                            <span>Job Title</span>
                                        </Label>
                                        <Input
                                            id={`jobTitle-${index}`}
                                            value={exp.jobTitle}
                                            placeholder="Software Developer"
                                            onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`companyName-${index}`}>
                                            <Building className="h-4 w-4 text-gray-500" />
                                            <span>Company Name</span>
                                        </Label>
                                        <Input
                                            id={`companyName-${index}`}
                                            value={exp.companyName}
                                            placeholder="Company XYZ"
                                            onChange={(e) => handleChange(index, "companyName", e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`startDate-${index}`}>
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>Start Date</span>
                                        </Label>
                                        <Input
                                            id={`startDate-${index}`}
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`endDate-${index}`}>
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>End Date</span>
                                        </Label>
                                        <Input
                                            id={`endDate-${index}`}
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                            
                                <div className="w-full">
                                    <Label className="mb-1.5" htmlFor={`description-${index}`}>Description</Label>
                                    <Textarea
                                        id={`description-${index}`}
                                        value={exp.description}
                                        placeholder="Describe your responsibilities and achievements..."
                                        onChange={(e) => handleChange(index, "description", e.target.value)}
                                        className="min-h-24 bg-white"
                                    />
                                </div>
                            </div>
                        )))}
                </div>

                <DrawerFooter className="pt-4 border-t">
                    <div className="flex gap-2 w-full">
                        <DrawerClose asChild>
                            <Button 
                                variant="outline" 
                                className="w-1/3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            onClick={submitHandler}
                            disabled={loading}
                            className="w-2/3 bg-red-500 hover:bg-red-600 text-white font-medium"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Saving...</span>
                                </div>
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

export default ExperienceDetails;